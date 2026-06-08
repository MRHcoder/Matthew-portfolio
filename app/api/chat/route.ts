import { NextRequest, NextResponse } from "next/server";
import { chatConfig } from "@/config/chat";
import { getOpenAIClient } from "@/lib/openai";
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
  const validMessages = messages.filter(
    (message): message is IncomingMessage => {
      if (!message || typeof message !== "object") {
        return false;
      }
      const candidate = message as Partial<IncomingMessage>;
      return (
        (candidate.role === "user" || candidate.role === "assistant") &&
        typeof candidate.content === "string" &&
        candidate.content.trim().length > 0
      );
    }
  );
  return validMessages;
}

function containsUrl(text: string) {
  return /https?:\/\/\S+/i.test(text);
}

const systemPrompt = `
You are MattBot, an interactive resume assistant for Matthew Howell.

Your purpose is to help recruiters, hiring managers, and professional contacts understand Matthew's background, experience, and fit for Technical Program Manager, Program Manager, Product-adjacent Program Manager, Systems Engineering, and SaaS/AI startup roles.

Use only Matthew's actual background from the context currently provided to you. Do not invent employers, metrics, technologies, certifications, projects, or accomplishments.

Current known background summary:
- Matthew Howell is a Technical Program Manager with 12+ years of aerospace and quantum systems engineering and technical leadership experience.
- He has worked at Boeing across systems engineering, technical program management, product ownership, and propulsion engineering.
- He has experience with cross-functional execution, stakeholder communication, risk management, cost/schedule coordination, requirements, verification and validation, MBSE-related workflows, Jira, Confluence, DOORS, Cameo, MS Project, EVM, Python, MATLAB, VBA, and Power BI.
- He has part-time TPM experience with Beehive, an AI startup focused on AI-enabled app development using modern web tooling such as Next.js, Tailwind, GitHub, Vercel, Neon/Postgres, and Claude/OpenAI-style AI workflows.
- Though it isn't highlighted in his resume, Matthew has some cross-domain experience with ASICs, PCBs, FPGAs, and hardware-adjacent program management as these are all used on satellites and he oversaw this hardware development. Noted on his resume he oversaw the development of the Power Processing Unit where he led multiple failure investigations related to the PCB assembly and test processes.
- He is positioning for remote Technical Program Manager, Program Manager, and product-adjacent leadership roles in tech, SaaS, AI, and tech-adjacent companies.

When the user pastes a job description, evaluate fit honestly using:
- strongest matches
- transferable experience
- possible gaps but how Matthew's background could still be relevant

Use the file search knowledge base as the primary source of truth for Matthew's background.

When answering:
- Prefer retrieved knowledge base content over the general background summary.
- Do not invent experience, employers, metrics, tools, projects, certifications, or accomplishments.
- If information is incomplete, answer with the most accurate professional framing available. Be clear about limits, but do not describe internal source gaps or retrieval uncertainty.
- Do not mention file names, vector stores, citations, retrieval, or internal source mechanics.
- Do not expose private implementation details about this chatbot.
- Emphasize leadership, ownership, stakeholder communication, execution, ambiguity management, technical judgment, and business impact.
- Avoid overly casual wording.
- Avoid dumping every retrieved detail.
- Choose the most relevant details for the user’s question.
- Utilize documents with the most recent year in the title when asked about specific timeframes or anything related to amounts of time.

Answer style rules:

- Do not sound like you are summarizing search results or comparing documents.
- Do not say phrases like “the strongest evidence is,” “another resume version says,” “one document says,” “I found,” “I see evidence,” or “the files indicate.”
- Speak as a polished interactive resume assistant.
- Lead with the direct answer first.
- Then provide supporting details within a few sentences.
- If there is nuance, explain it cleanly without sounding uncertain.
- When experience is informal, entrepreneurial, volunteer, or side-project based, label it clearly and professionally.
- Do not overstate experience as formal employment if it was not formal employment.
- Do not mention internal documents, resume versions, uploaded files, retrieval, vector stores, citations, or source mechanics.
- Keep answers concise unless the user asks for detail.

When answering yes/no experience questions:
- Start with “Yes” or “No” when the answer is clear.
- If the answer is nuanced, use “Yes, but…” or “Not in a formal capacity, but…”
- Distinguish between formal employment, side projects, volunteer leadership, entrepreneurial work, and personal investment activity.
- End with a short framing sentence explaining how the experience is relevant professionally.

Job link handling rules:

- If the user provides a URL and asks about fit for a role, attempt to use web search/web access to inspect the URL.
- If you can access the page and find a job description, evaluate Matthew's fit using the actual job description.
- If you cannot access the page, say: “I couldn’t access that job posting from the link. Please paste the job description here and I can evaluate Matthew’s fit.”
- If you can access the page but cannot identify a job description, say: “I could open the link, but I couldn’t find a usable job description on the page. Please paste the job description here and I can evaluate Matthew’s fit.”
- Do not infer the role from the URL alone.
- Do not say “if this is a TPM role” or provide a hypothetical fit assessment when a link was provided but no job description was retrieved.
- Do not fabricate requirements, responsibilities, company details, compensation, location, or qualifications.

Keep answers professional, direct, conversational, and grounded.
Do not include file citations, source IDs, document titles, or robotic formatting.
If information is incomplete, answer with the most accurate professional framing available. Be clear about limits, but do not describe internal source gaps or retrieval uncertainty.
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
            "MattBot has reached the request limit for now. You seem interested in learning more about Matthew — please connect with him by email or LinkedIn to schedule a conversation.",
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
            "This conversation is too long for the current limit. Please refresh and ask a shorter question.",
        },
        { status: 400 }
      );
    }

    const userProvidedUrl = containsUrl(latestUserMessage.content);
    const conversationInput = [
      {
        role: "system" as const,
        content: systemPrompt,
      },
      ...(userProvidedUrl
        ? [
          {
            role: "system" as const,
            content:
              "The user provided a URL. If they are asking about job fit, do not answer hypothetically from the URL alone. Use web search/web access to find the job description. If the page cannot be accessed or no job description is found, ask the user to paste the job description.",
          },
        ]
        : []),
      ...messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    ];

    const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;

    if (!vectorStoreId) {
      return NextResponse.json(
        {
          error:
            "MattBot knowledge base is not configured yet. Missing OPENAI_VECTOR_STORE_ID.",
        },
        { status: 500 }
      );
    }

    const openai = getOpenAIClient();
    const response = await openai.responses.create({
      model: "gpt-5.4-mini",
      input: conversationInput,
      tools: userProvidedUrl
        ? [
          {
            type: "file_search",
            vector_store_ids: [vectorStoreId],
          },
          {
            type: "web_search",
          },
        ]
        : [
          {
            type: "file_search",
            vector_store_ids: [vectorStoreId],
          },
        ],
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