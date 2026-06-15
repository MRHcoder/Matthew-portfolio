import {
  BriefcaseBusiness,
  FileSearch,
  Presentation,
} from "lucide-react";

import { ChatBot } from "@/components/chat/ChatBot";
import { chatConfig } from "@/config/chat";
import { themeConfig } from "@/config/theme";

const mattBotCapabilities = [
  {
    icon: BriefcaseBusiness,
    title: "Role fit",
    description:
      "Paste a job description or job posting link and ask how my background maps to the role.",
  },
  {
    icon: FileSearch,
    title: "Experience lookup",
    description:
      "Ask about program management, systems engineering, product ownership, AI startup work, or leadership experience.",
  },
  {
    icon: Presentation,
    title: "Get to know me",
    description:
      "Surface relevant examples, strengths, gaps, and talking points about my background.",
  },
];

export function MattBotSection() {
  return (
    <section
      id="mattbot"
      className={`border-t ${themeConfig.sectionBlueBackground}`}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className={themeConfig.sectionLabel}>
            {chatConfig.assistantName}
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Ask questions about my background or paste a job description.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-950">
            MattBot is designed to help recruiters and hiring managers quickly
            understand my background, project experience, and fit for technical
            program management, product-adjacent, and AI/software delivery
            roles. Click on a suggested prompt or type your own to get started.
            You can ask about my experience with specific technologies,
            projects, how I approach problem-solving and collaboration, or
            anything else about my background.
          </p>

          <div className="mt-8 space-y-4">
            {mattBotCapabilities.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="grid gap-4 rounded-2xl border border-sky-500/20 bg-white p-5 shadow-sm sm:grid-cols-[80px_1fr] sm:items-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 sm:mx-0">
                    <Icon className="h-8 w-8" />
                  </div>

                  <div className="text-center sm:text-left">
                    <p className="text-lg font-semibold text-slate-950">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-950">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:pt-[52px]">
          <ChatBot />
        </div>
      </div>
    </section>
  );
}