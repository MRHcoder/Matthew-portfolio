import {
  BriefcaseBusiness,
  FileSearch,
  MessagesSquare,
  Presentation,
} from "lucide-react";

import { ChatBot } from "@/components/chat/ChatBot";
import { chatConfig } from "@/config/chat";

const mattBotCapabilities = [
  {
    icon: BriefcaseBusiness,
    title: "Role fit",
    description:
      "Paste a job description and ask how my background maps to the role.",
  },
  {
    icon: FileSearch,
    title: "Experience lookup",
    description:
      "Ask about program management, systems engineering, product ownership, or AI startup work.",
  },
  {
    icon: Presentation,
    title: "Interview prep",
    description:
      "Surface relevant examples, strengths, gaps, and talking points.",
  },
];

export function MattBotSection() {
  return (
    <section id="mattbot" className="border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {chatConfig.assistantName}
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Ask questions about my background or paste a job description.
          </h2>

          <p className="mt-5 leading-8 text-muted-foreground">
            MattBot is designed to help recruiters and hiring managers quickly
            understand my background, project experience, and fit for technical
            program management, product-adjacent, and AI/software delivery
            roles. Click on a suggested prompt or type your own to get started. 
            You can ask about my experience with specific technologies, projects, how 
            I approach problem-solving and collaboration, or anything else about my background.
          </p>

          <div className="mt-8 space-y-4">
            {mattBotCapabilities.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="grid gap-4 rounded-2xl border bg-background p-5 sm:grid-cols-[72px_1fr] sm:items-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:mx-0">
                    <Icon className="h-7 w-7" />
                  </div>

                  <div className="text-center sm:text-left">
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border bg-muted/30 p-4 text-sm leading-7 text-muted-foreground">
            <MessagesSquare className="mt-1 h-4 w-4 shrink-0" />
            <p>
              This is currently a front-end preview. In the next phase, responses
              will be generated server-side with rate limits, output limits, and
              resume/project grounding.
            </p>
          </div>
        </div>

        <div className="lg:pt-[52px]">
          <ChatBot />
        </div>
      </div>
    </section>
  );
}