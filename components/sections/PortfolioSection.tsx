import Link from "next/link";
import {
  BriefcaseBusiness,
  ExternalLink,
  Sparkles,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { themeConfig } from "@/config/theme";
import { links } from "@/data/links";
import { projects } from "@/data/projects";

const projectIcons = {
  program: BriefcaseBusiness,
  startup: Sparkles,
  process: Workflow,
};

export function PortfolioSection() {
  return (
    <section id="portfolio" className={`border-t ${themeConfig.sectionGrayBackground}`}>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className={themeConfig.sectionLabel}>Portfolio</p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          What I've Accomplished.
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {projects.map((project) => {
            const Icon =
              projectIcons[project.type as keyof typeof projectIcons];

            return (
              <Card key={project.title} className={themeConfig.softCard}>
                <CardContent className="p-6">
                  <div
                    className={`${themeConfig.iconAccent} flex h-11 w-11 items-center justify-center rounded-2xl`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {project.description}
                  </p>

                  {project.type === "roadmap" && (
                    <Button
                      asChild
                      variant="outline"
                      className="mt-5 rounded-full bg-background/80"
                    >
                      <Link href={links.miroBoard} target="_blank">
                        View Miro Board{" "}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}