import { NextRequest, NextResponse } from "next/server";

import { chatConfig } from "@/config/chat";
import { openai } from "@/lib/openai";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function validateMessages(messages: unknown): IncomingMessage[] | null {
  if (!Array.isArray(messages)) {
    return null;
  }

  const validMessages = messages.filter((message): message is IncomingMessage => {
    if (!message || typeof message !== "object") {
      return false;
    }

    const candidate = message as Partial<IncomingMessage>;

    return (
      (candidate.role === "user" || candidate.role === "assistant") &&
      typeof candidate.content === "string" &&
      candidate.content.trim().length > 0
    );
  });

  return validMessages;
}

const systemPrompt = `
You are MattBot, an interactive resume assistant for Matthew Howell.

Your purpose is to help recruiters, hiring managers, and professional contacts understand Matthew's background, experience, and fit for Technical Program Manager, Program Manager, Product-adjacent Program Manager, Systems Engineering, and SaaS/AI startup roles.

Use only Matthew's actual background from the context currently provided to you. Do not invent employers, metrics, technologies, certifications, projects, or accomplishments.

Current known background summary:
- Matthew Howell is a Technical Program Manager with 10+ years of aerospace systems engineering and technical leadership experience.
- He has worked at Boeing across systems engineering, technical program management, product ownership, and propulsion engineering.
- He has experience with cross-functional execution, stakeholder communication, risk management, cost/schedule coordination, requirements, verification and validation, MBSE-related workflows, Jira, Confluence, DOORS, Cameo, MS Project, EVM, Python, MATLAB, VBA, and Power BI.
- He has part-time TPM experience with Beehive, an AI startup focused on AI-enabled app development using modern web tooling such as Next.js, Tailwind, GitHub, Vercel, Neon/Postgres, and Claude/OpenAI-style AI workflows.
- He is positioning for remote Technical Program Manager, Program Manager, and product-adjacent leadership roles in tech, SaaS, AI, and tech-adjacent companies.

When the user pastes a job description, evaluate fit honestly using:
- strongest matches
- transferable experience
- possible gaps
- how Matthew should position himself
- suggested interview talking points

Keep answers professional, direct, conversational, and grounded.
Do not include file citations, source IDs, document titles, or robotic formatting.
If you do not have enough information, say what you can infer and what would need confirmation.
`.trim();

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);

    const limited = rateLimit({
      key: `chat:${clientIp}`,
      limit: chatConfig.rateLimit.requests,
      windowMs: chatConfig.rateLimit.windowMinutes * 60 * 1000,
    });

    if (!limited.success) {
      return NextResponse.json(
        {
          error:
            "MattBot has reached the request limit for this window. Please try again later.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const messages = validateMessages(body.messages);

    if (!messages) {
      return NextResponse.json(
        { error: "Invalid message format." },
        { status: 400 }
      );
    }

    const userMessages = messages.filter((message) => message.role === "user");

    if (userMessages.length > chatConfig.maxMessagesPerSession) {
      return NextResponse.json(
        { error: "This chat session has reached the message limit." },
        { status: 400 }
      );
    }

    const latestUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === "user");

    if (!latestUserMessage) {
      return NextResponse.json(
        { error: "No user message found." },
        { status: 400 }
      );
    }

    if (latestUserMessage.content.length > chatConfig.maxInputCharacters) {
      return NextResponse.json(
        {
          error: `Message is too long. Please keep it under ${chatConfig.maxInputCharacters.toLocaleString()} characters.`,
        },
        { status: 400 }
      );
    }

    const totalInputCharacters = messages.reduce(
      (total, message) => total + message.content.length,
      0
    );

    if (totalInputCharacters > chatConfig.maxInputCharacters * 2) {
      return NextResponse.json(
        {
          error:
            "This conversation is too long for the current demo limit. Please refresh and ask a shorter question.",
        },
        { status: 400 }
      );
    }

    const conversationInput = [
      {
        role: "system" as const,
        content: systemPrompt,
      },
      ...messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    ];

    const response = await openai.responses.create({
      model: "gpt-5.5-mini",
      input: conversationInput,
      max_output_tokens: chatConfig.maxOutputTokens,
    });

    return NextResponse.json({
      message: response.output_text,
      remaining: limited.remaining,
    });
  } catch (error) {
    console.error("MattBot API error:", error);

    return NextResponse.json(
      {
        error:
          "MattBot had trouble generating a response. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}