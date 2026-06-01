import Link from "next/link";
import { ExternalLink, FileText, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { themeConfig } from "@/config/theme";
import { links } from "@/data/links";
import { profile } from "@/data/profile";

export function ContactSection() {
  return (
    <section id="contact" className="border-t bg-slate-50/70">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className={themeConfig.sectionLabel}>Contact</p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Let’s connect.
            </h2>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Reach out by email, view my LinkedIn profile, or download my
              resume for a more traditional summary of my background.
            </p>
          </div>

          <Card className="rounded-3xl border-sky-500/20 bg-gradient-to-br from-background to-sky-500/5 shadow-md">
            <CardContent className="grid gap-4 p-6">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 justify-between rounded-xl bg-background/80"
              >
                <Link href={links.email}>
                  Email <Mail className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 justify-between rounded-xl bg-background/80"
              >
                <Link href={links.linkedin} target="_blank">
                  LinkedIn <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 justify-between rounded-xl bg-background/80"
              >
                <Link href={profile.resumePath}>
                  Resume <FileText className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}