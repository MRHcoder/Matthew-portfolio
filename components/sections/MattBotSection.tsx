import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatConfig } from "@/config/chat";
import { themeConfig } from "@/config/theme";

export function MattBotSection() {
  return (
    <section id="mattbot" className={`border-t ${themeConfig.sectionMutedBackground}`}>
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {chatConfig.assistantName}
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Ask questions about my background or paste a job description.
          </h2>

          <p className="mt-5 leading-8 text-muted-foreground">
            This will become an AI-powered interactive resume assistant. For
            now, this is the visual shell. The OpenAI integration comes next.
          </p>

          <div className="mt-6 grid gap-2">
            {chatConfig.suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                className="rounded-lg border bg-background px-4 py-3 text-left text-sm text-muted-foreground transition hover:text-foreground"
                disabled
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <Card className={`rounded-2xl ${themeConfig.botCardGlow}`}>
          <CardContent className="p-6">
            <div className="rounded-xl border bg-background p-4">
              <p className="text-sm text-muted-foreground">
                {chatConfig.introMessage}
              </p>
            </div>

            <div className="mt-5 space-y-3">
              <Input placeholder="Your name or role, optional" />

              <Textarea
                placeholder={chatConfig.placeholder}
                className="min-h-32"
                maxLength={chatConfig.maxInputCharacters}
              />

              <p className="text-xs text-muted-foreground">
                Limit: {chatConfig.maxInputCharacters.toLocaleString()} characters.
              </p>

              <Button className="w-full" disabled>
                Chat integration coming soon
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}