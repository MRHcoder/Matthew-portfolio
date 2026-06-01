import Link from "next/link";
import {
  ArrowRight,
  Download,
  ExternalLink,
  Mail,
  Sparkles,
} from "lucide-react";

import { themeConfig } from "@/config/theme";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { links } from "@/data/links";
import { profile } from "@/data/profile";

export function HeroSection() {
  return (
    <section className={`${themeConfig.heroGradient} border-b`}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.3fr_0.7fr] md:items-center">
        <div>
          <Badge
            className="mb-5 rounded-full border-sky-500/20 bg-sky-500/10 text-sky-700"
            variant="outline"
          >
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            {profile.title}
          </Badge>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            {profile.headline}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {profile.summary}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full bg-background/80"
            >
              <Link href="#mattbot">
                Ask MattBot <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full bg-background/80"
            >
              <Link href={profile.resumePath}>
                Download Resume <Download className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full bg-background/80"
            >
              <Link href={links.email}>
                Email Me <Mail className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full bg-background/80"
            >
              <Link href={links.linkedin} target="_blank">
                LinkedIn <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <Card
          className={`rounded-3xl bg-background/80 shadow-xl backdrop-blur ${themeConfig.cardAccentBorder}`}
        >
          <CardContent className="p-6">
            <p className="text-center text-sm font-semibold uppercase tracking-wider text-sky-700">
              Focus Areas
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <p className="font-medium">Program Leadership</p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Leading complex work across cost, schedule, technical risk,
                  stakeholder alignment, and cross-functional execution.
                </p>
              </div>

              <Separator />

              <div>
                <p className="font-medium">Systems Engineering</p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Requirements, verification and validation, interface control,
                  MBSE-related workflows, and technical decision support.
                </p>
              </div>

              <Separator />

              <div>
                <p className="font-medium">AI / Software Delivery</p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Startup TPM experience supporting AI-enabled app development,
                  roadmap planning, sprint structure, and modern web tooling.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}