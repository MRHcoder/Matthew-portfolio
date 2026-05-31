"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Bot, Loader2, Send, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatConfig } from "@/config/chat";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { SuggestedPrompts } from "@/components/chat/SuggestedPrompts";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function createMessage(role: Message["role"], content: string): Message {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
  };
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    createMessage("assistant", chatConfig.introMessage),
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastUserMessageId, setLastUserMessageId] = useState<string | null>(
    null
  );
  const [lastAssistantMessageId, setLastAssistantMessageId] = useState<
    string | null
  >(null);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const userMessageCount = useMemo(
    () => messages.filter((message) => message.role === "user").length, 
    [messages]
  );

  const hasReachedSessionLimit =
    userMessageCount >= chatConfig.maxMessagesPerSession;

  const charactersRemaining = chatConfig.maxInputCharacters - input.length;

  useEffect(() => {
  if (!lastUserMessageId || !isLoading) {
    return;
  }

  const container = messagesContainerRef.current;
  const userMessageElement = lastMessageRefs.current[lastUserMessageId];

  if (!container || !userMessageElement) {
    return;
  }

  const containerTop = container.getBoundingClientRect().top;
  const messageTop = userMessageElement.getBoundingClientRect().top;
  const offset = messageTop - containerTop;

  container.scrollTo({
    top: container.scrollTop + offset,
    behavior: "smooth",
  });
}, [lastUserMessageId, isLoading]);

useEffect(() => {
  if (!lastAssistantMessageId || isLoading) {
    return;
  }

  const container = messagesContainerRef.current;
  const assistantMessageElement = lastMessageRefs.current[lastAssistantMessageId];

  if (!container || !assistantMessageElement) {
    return;
  }

  const containerTop = container.getBoundingClientRect().top;
  const messageTop = assistantMessageElement.getBoundingClientRect().top;
  const offset = messageTop - containerTop;

  container.scrollTo({
    top: container.scrollTop + offset,
    behavior: "smooth",
  });
}, [lastAssistantMessageId, isLoading]);

  async function submitMessage(messageContent: string) {
    const trimmedInput = messageContent.trim();

    if (!trimmedInput || isLoading || hasReachedSessionLimit) {
      return;
    }

    const userMessage = createMessage("user", trimmedInput);

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setLastUserMessageId(userMessage.id);
    setLastAssistantMessageId(null);
    setInput("");
    setIsLoading(true);

    try {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [...messages, userMessage].map((message) => ({
        role: message.role,
        content: message.content,
      })),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "MattBot failed to respond.");
  }

  const assistantMessage = createMessage(
    "assistant",
    data.message || "MattBot did not return a response."
  );

  setMessages((currentMessages) => [...currentMessages, assistantMessage]);
  setLastAssistantMessageId(assistantMessage.id);
} catch (error) {
  const errorMessage =
    error instanceof Error
      ? error.message
      : "MattBot had trouble responding. Please try again.";

  const assistantMessage = createMessage("assistant", errorMessage);

  setMessages((currentMessages) => [...currentMessages, assistantMessage]);
  setLastAssistantMessageId(assistantMessage.id);
} finally {
  setIsLoading(false);
}
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitMessage(input);
  }

  async function handleSuggestedPrompt(prompt: string) {
    await submitMessage(prompt);
  }

  return (
    <div className="flex h-[820px] max-h-[820px] flex-col overflow-hidden rounded-2xl border bg-background shadow-xl shadow-black/5">
      <div className="shrink-0 border-b bg-muted/30 px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Bot className="h-5 w-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold">{chatConfig.assistantName}</p>
                <span className="rounded-full border bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  Preview
                </span>
              </div>

              <p className="text-xs text-muted-foreground">
                Interactive resume assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" />
            Limits enabled
          </div>
        </div>
      </div>

      <div className="shrink-0 border-b px-5 py-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Try asking
        </p>

        <SuggestedPrompts
          prompts={chatConfig.suggestedPrompts}
          disabled={isLoading || hasReachedSessionLimit}
          onSelect={handleSuggestedPrompt}
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div
  ref={messagesContainerRef}
  className="min-h-0 flex-1 space-y-4 overflow-y-scroll bg-muted/20 p-5 [scrollbar-width:thin] [scrollbar-color:hsl(var(--muted-foreground))_transparent]"
>
          {messages.map((message) => (
  <div
    key={message.id}
    ref={(element) => {
      lastMessageRefs.current[message.id] = element;
    }}
  >
    <ChatMessage role={message.role} content={message.content} />
  </div>
))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl rounded-tl-md border bg-background px-4 py-3 text-sm text-muted-foreground shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                MattBot is thinking...
              </div>
            </div>
          )}
        </div>

        {hasReachedSessionLimit && (
          <div className="shrink-0 border-t border-amber-500/20 bg-amber-500/10 px-5 py-3 text-sm text-muted-foreground">
            {chatConfig.limitReachedMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="shrink-0 border-t bg-background p-4"
        >
          <div className="rounded-2xl border bg-muted/20 p-3 transition focus-within:border-primary/50 focus-within:bg-background">
            <Textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();

                  if (!input.trim() || isLoading || hasReachedSessionLimit) {
                    return;
                  }

                  event.currentTarget.form?.requestSubmit();
                }
            }}
            placeholder={chatConfig.placeholder}
            className="min-h-16 resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            maxLength={chatConfig.maxInputCharacters}
            disabled={isLoading || hasReachedSessionLimit}
          />

            <div className="mt-2 flex flex-col gap-3 border-t pt-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                {charactersRemaining.toLocaleString()} characters remaining ·{" "}
                {userMessageCount}/{chatConfig.maxMessagesPerSession} messages
                used
              </p>

              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading || hasReachedSessionLimit}
                className="h-10 w-10 cursor-pointer rounded-full disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}