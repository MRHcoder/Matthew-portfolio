import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";

import { themeConfig } from "@/config/theme";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { links } from "@/data/links";
import { profile } from "@/data/profile";

export function HeroSection() {
  return (
    <section className={themeConfig.heroGradient}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-[1.3fr_0.7fr] md:items-center">
        <div>
          <Badge className="mb-5" variant="secondary">
            {profile.title}
          </Badge>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            {profile.headline}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#mattbot">
                Ask MattBot <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href={profile.resumePath}>
                Download Resume <Download className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="ghost" size="lg">
              <Link href={links.email}>
                Email Me <Mail className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <Card className={`rounded-2xl shadow-sm ${themeConfig.cardAccentBorder}`}>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">
              Focus Areas
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <p className="font-medium">Program Leadership</p>
                <p className="text-sm text-muted-foreground">
                  Cost, schedule, technical risk, stakeholder alignment, and
                  execution across complex programs.
                </p>
              </div>

              <Separator />

              <div>
                <p className="font-medium">Systems Engineering</p>
                <p className="text-sm text-muted-foreground">
                  Requirements, verification, validation, MBSE, interface
                  control, and technical tradeoffs.
                </p>
              </div>

              <Separator />

              <div>
                <p className="font-medium">AI / Software Delivery</p>
                <p className="text-sm text-muted-foreground">
                  Startup TPM experience supporting AI-enabled app development
                  workflows and modern web tooling.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}