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

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-950">
            {profile.summary}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-sky-700 text-white shadow-sm hover:bg-sky-800"
            >
              <Link href="#mattbot">
                Ask MattBot <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-sky-700 bg-white text-sky-800 shadow-sm hover:bg-sky-50 hover:text-sky-900"
            >
              <Link href={profile.resumePath}>
                Download Resume <Download className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-sky-700 bg-white text-sky-800 shadow-sm hover:bg-sky-50 hover:text-sky-900"
            >
              <Link href={links.email}>
                Email Me <Mail className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-sky-700 bg-white text-sky-800 shadow-sm hover:bg-sky-50 hover:text-sky-900"
            >
              <Link href={links.linkedin} target="_blank">
                LinkedIn <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <Card
          className={`rounded-3xl bg-white shadow-xl ${themeConfig.cardAccentBorder}`}
        >
          <CardContent className="p-6">
            <p className="text-center text-lg font-bold uppercase tracking-wider text-sky-700 md:text-xl">
              What I Bring
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-lg font-semibold text-slate-950">
                  Cross-Functional Leadership
                </p>
                <p className="text-sm leading-6 text-slate-950">
                  Enabling teams to execute effectively by removing blockers,
                  aligning stakeholders, and challenging process friction when it
                  gets in the way of delivery.
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-lg font-semibold text-slate-950">
                  Execution Focused
                </p>
                <p className="text-sm leading-6 text-slate-950">
                  Goal-oriented program leader with a track record of turning
                  complex technical work into clear plans, accountable milestones,
                  and delivered hardware/software outcomes.
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-lg font-semibold text-slate-950">
                  Technical Foundation
                </p>
                <p className="text-sm leading-6 text-slate-950">
                  Systems engineering and product ownership experience provide
                  the technical fluency to connect engineering detail with program
                  priorities and stakeholder decisions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}