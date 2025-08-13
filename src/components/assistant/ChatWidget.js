"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import useChatStore from "./useChatStore";

const MODES = [
  { id: "page", label: "Page Help", icon: "Page" },
  { id: "bjj", label: "BJJ Coach", icon: "BJJ" },
  { id: "pm", label: "PM Consultant", icon: "PM" },
  { id: "recruiter", label: "Recruiter", icon: "Recruiter" },
];

const MessageBubble = ({ message, isStreaming }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-primary text-white"
            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        }`}
      >
        <div className="text-sm whitespace-pre-wrap">
          {message.content}
          {isStreaming && !isUser && (
            <span className="inline-block w-2 h-4 bg-gray-400 dark:bg-gray-600 ml-1 animate-pulse" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ModeTab = ({ mode, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-primary text-white"
        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
    }`}
  >
    <span className="font-semibold">{mode.icon}</span>
    <span className="hidden sm:inline">{mode.label}</span>
  </button>
);

export default function ChatWidget({ pageMeta }) {
  const router = useRouter();
  const {
    isOpen,
    mode,
    messages,
    isStreaming,
    error,
    toggleOpen,
    setMode,
    setPageMeta,
    sendMessage,
    clearError,
    loadMessages,
    saveMessages,
  } = useChatStore();

  const [inputValue, setInputValue] = useState("");
  const [userSelection, setUserSelection] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  // Load messages when page changes
  useEffect(() => {
    if (pageMeta) {
      setPageMeta(pageMeta);
      loadMessages(router.asPath);
    }
  }, [router.asPath, pageMeta, setPageMeta, loadMessages]);

  // Save messages when they change
  useEffect(() => {
    if (messages.length > 0) {
      saveMessages(router.asPath);
    }
  }, [messages, router.asPath, saveMessages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle user text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const selectedText = selection.toString().trim();
      if (selectedText && selectedText.length > 10) {
        setUserSelection(selectedText);
      } else {
        setUserSelection("");
      }
    };

    document.addEventListener("selectionchange", handleSelection);
    return () =>
      document.removeEventListener("selectionchange", handleSelection);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        toggleOpen();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, toggleOpen]);

  // Focus trap
  useEffect(() => {
    if (isOpen && panelRef.current) {
      const focusableElements = panelRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener("keydown", handleTabKey);
      return () => document.removeEventListener("keydown", handleTabKey);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isStreaming) return;

    const content = inputValue.trim();
    setInputValue("");

    // Include user selection if available
    const selectionContext = userSelection
      ? `\n\nUser selection: "${userSelection}"`
      : "";
    await sendMessage(content + selectionContext);
    setUserSelection("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-xl hover:shadow-2xl transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Assistant"
      >
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </motion.button>

      {/* Slide-over Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={toggleOpen}
            />

            {/* Panel */}
            <motion.div
              ref={panelRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="chat-title"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2
                    id="chat-title"
                    className="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    BJJ × PM Assistant
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ask me anything about this page or BJJ/PM
                  </p>
                </div>
                <button
                  onClick={toggleOpen}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="Close chat"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mode Tabs */}
              <div className="flex gap-1 p-4 border-b border-gray-200 dark:border-gray-700">
                {MODES.map((modeOption) => (
                  <ModeTab
                    key={modeOption.id}
                    mode={modeOption}
                    isActive={mode === modeOption.id}
                    onClick={() => setMode(modeOption.id)}
                  />
                ))}
              </div>

              {/* User Selection Notice */}
              {userSelection && (
                <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    💡 Text selected: &ldquo;{userSelection.substring(0, 50)}
                    ...&rdquo;
                  </p>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    <div className="text-4xl mb-4">💬</div>
                    <p className="text-sm">
                      {mode === "page" && "Ask me about this page!"}
                      {mode === "bjj" && "Ask me about BJJ with PM analogies!"}
                      {mode === "pm" && "Ask me about PM with BJJ analogies!"}
                      {mode === "recruiter" &&
                        "Ask me about Matt's background!"}
                    </p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <MessageBubble
                      key={index}
                      message={message}
                      isStreaming={isStreaming && index === messages.length - 1}
                    />
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Error Toast */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-4 mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {error}
                    </p>
                    <button
                      onClick={clearError}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-300"
                    >
                      ×
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message... (Shift+Enter for new line)"
                    className="flex-1 resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={1}
                    disabled={isStreaming}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isStreaming}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
