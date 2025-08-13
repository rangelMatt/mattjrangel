import { create } from "zustand";

const useChatStore = create((set, get) => ({
  // State
  isOpen: false,
  mode: "page", // 'page', 'bjj', 'pm', 'recruiter'
  messages: [],
  isStreaming: false,
  error: null,
  pageMeta: null,

  // Actions
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),

  setMode: (mode) => set({ mode }),

  setPageMeta: (pageMeta) => set({ pageMeta }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  updateLastMessage: (content) =>
    set((state) => ({
      messages: state.messages.map((msg, index) =>
        index === state.messages.length - 1
          ? { ...msg, content: msg.content + content }
          : msg
      ),
    })),

  setStreaming: (isStreaming) => set({ isStreaming }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  clearMessages: () => set({ messages: [] }),

  // Persist messages to localStorage
  saveMessages: (pathname) => {
    const { messages } = get();
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `chat:${pathname}`,
        JSON.stringify(messages.slice(-10))
      );
    }
  },

  loadMessages: (pathname) => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`chat:${pathname}`);
      if (saved) {
        try {
          const messages = JSON.parse(saved);
          set({ messages });
        } catch (error) {
          console.error("Failed to load chat messages:", error);
        }
      }
    }
  },

  // Send message to API
  sendMessage: async (content, userSelection = null) => {
    const { messages, mode, pageMeta } = get();

    // Add user message
    const userMessage = { role: "user", content };
    get().addMessage(userMessage);

    // Add assistant message placeholder
    const assistantMessage = { role: "assistant", content: "" };
    get().addMessage(assistantMessage);

    // Prepare payload
    let payload = {
      messages: [...messages, userMessage],
      mode,
      pageMeta,
    };

    // Add user selection if provided
    if (userSelection) {
      payload.userSelection = userSelection;
    }

    set({ isStreaming: true, error: null });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);

            if (data === "[DONE]") {
              break;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                get().updateLastMessage(parsed.content);
              }
            } catch (e) {
              // Ignore parsing errors for incomplete chunks
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      set({ error: "AI chat is unavailable—check API key." });

      // Remove the assistant message if there was an error
      set((state) => ({
        messages: state.messages.slice(0, -1),
      }));
    } finally {
      set({ isStreaming: false });
    }
  },
}));

export default useChatStore;
