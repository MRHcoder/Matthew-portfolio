import Link from "next/link";
import {
  BriefcaseBusiness,
  ExternalLink,
  Map,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { links } from "@/data/links";
import { projects } from "@/data/projects";

const projectIcons = {
  program: BriefcaseBusiness,
  startup: MessageSquare,
  roadmap: Map,
};

export function PortfolioSection() {
  return (
    <section id="portfolio" className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Portfolio
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          Selected work and project artifacts.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projects.map((project) => {
            const Icon = projectIcons[project.type as keyof typeof projectIcons];

            return (
              <Card key={project.title} className="rounded-2xl">
                <CardContent className="p-6">
                  <Icon className="h-6 w-6" />

                  <h3 className="mt-5 font-semibold">{project.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {project.description}
                  </p>

                  {project.type === "roadmap" && (
                    <Button asChild variant="outline" className="mt-5">
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