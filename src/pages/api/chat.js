import OpenAI from "openai";

// In-memory rate limiting (in production, use Redis)
const rateLimitMap = new Map();
const RATE_LIMIT_REQUESTS = 10;
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes

function getRateLimitKey(req) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded ? forwarded.split(",")[0] : req.connection.remoteAddress;
  return ip;
}

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];

  // Remove old requests outside the window
  const validRequests = userRequests.filter(
    (time) => now - time < RATE_LIMIT_WINDOW
  );

  if (validRequests.length >= RATE_LIMIT_REQUESTS) {
    return false;
  }

  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  return true;
}

function buildSystemPrompt(mode, pageMeta) {
  const basePrompt = `You are an AI assistant for mattjrangel.com, focused on the intersection of Brazilian Jiu-Jitsu (BJJ) and Program Management. 

Style: Concise, PM×BJJ-aware, professional. Use bullet points when helpful. Keep responses under 120 words unless asked for depth.

Context: This site showcases how BJJ principles apply to project management and vice versa.`;

  switch (mode) {
    case "page":
      return `${basePrompt}

Current page: ${pageMeta?.title || "Unknown page"}
URL: ${pageMeta?.url || "Unknown URL"}

Reference ${pageMeta?.title || "this page"} in your first sentence. Focus on current page content.`;

    case "bjj":
      return `${basePrompt}

You are acting as a BJJ coach who uses project management analogies. When explaining BJJ concepts, draw parallels to PM principles like:
- Position before submission = Planning before execution
- Escaping bad positions = Risk mitigation
- Chain submissions = Process optimization
- Rolling with different partners = Stakeholder management`;

    case "pm":
      return `${basePrompt}

You are acting as a project management consultant who uses BJJ analogies. When explaining PM concepts, draw parallels to BJJ principles like:
- Project planning = Game planning for a match
- Risk management = Defensive positioning
- Team coordination = Rolling with partners
- Continuous improvement = Training progression`;

    case "recruiter":
      return `${basePrompt}

You are helping recruiters understand Matt's background. ALWAYS include:
1. 2-3 quantified career highlights (years of experience, team sizes, project values, etc.)
2. 2-3 relevant internal links to specific pages on mattjrangel.com (use relative URLs like /project-dashboard/blog/...)

Focus on technical skills, leadership experience, and unique BJJ/PM intersection.`;

    default:
      return basePrompt;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    return res.status(400).json({ error: "Missing OPENAI_API_KEY" });
  }

  // Rate limiting
  const clientIP = getRateLimitKey(req);
  if (!checkRateLimit(clientIP)) {
    return res
      .status(429)
      .json({ error: "Rate limit exceeded. Please try again in 5 minutes." });
  }

  try {
    const { messages, mode = "page", pageMeta } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = buildSystemPrompt(mode, pageMeta);
    const allMessages = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];

    const stream = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: allMessages,
      stream: true,
      temperature: 0.3,
      max_tokens: 700,
    });

    // Set headers for streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Stream the response
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Chat API error:", error);

    if (error.code === "insufficient_quota") {
      return res
        .status(429)
        .json({ error: "API quota exceeded. Please try again later." });
    }

    if (error.code === "invalid_api_key") {
      return res.status(500).json({ error: "API configuration error." });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}
