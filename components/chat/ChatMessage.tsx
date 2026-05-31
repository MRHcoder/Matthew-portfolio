type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
};

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[88%] gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
        <div
          className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "border bg-background text-muted-foreground"
          }`}
        >
          {isUser ? "You" : "MB"}
        </div>

        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-7 shadow-sm ${
            isUser
              ? "rounded-tr-md bg-primary text-primary-foreground"
              : "rounded-tl-md border bg-background text-muted-foreground"
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
}