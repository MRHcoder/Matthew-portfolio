import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  ExternalLink,
  Mail,
  Map,
  MessageSquare,
  Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const experience = [
  {
    role: "Technical Program Manager / Systems Engineering Lead",
    company: "Boeing",
    period: "2014–Present",
    description:
      "Led complex aerospace programs across systems engineering, product ownership, risk management, technical execution, and cross-functional stakeholder coordination.",
  },
  {
    role: "Technical Program Manager",
    company: "Beehive AI Startup",
    period: "Part-time",
    description:
      "Supported an AI app-building startup using modern software delivery workflows across Claude API, GitHub, Vercel, Neon, and Next.js-based application development.",
  },
  {
    role: "Product Owner / Propulsion Engineer",
    company: "Boeing",
    period: "Earlier Roles",
    description:
      "Owned propulsion hardware product execution, led qualification efforts, managed technical risk, and supported requirement verification and on-orbit operations.",
  },
];

const skills = [
  "Technical Program Management",
  "Systems Engineering",
  "Product Ownership",
  "Risk Management",
  "Jira",
  "Confluence",
  "DOORS",
  "Cameo",
  "EVM",
  "MS Project",
  "Python",
  "Power BI",
  "Agile / Waterfall",
  "Stakeholder Management",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="#" className="font-semibold tracking-tight">
            Matthew Howell
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link href="#about" className="hover:text-foreground">
              About
            </Link>
            <Link href="#experience" className="hover:text-foreground">
              Experience
            </Link>
            <Link href="#portfolio" className="hover:text-foreground">
              Portfolio
            </Link>
            <Link href="#mattbot" className="hover:text-foreground">
              MattBot
            </Link>
            <Link href="#contact" className="hover:text-foreground">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-[1.3fr_0.7fr] md:items-center">
        <div>
          <Badge className="mb-5" variant="secondary">
            Technical Program Manager
          </Badge>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Aerospace systems depth meets software, AI, and product execution.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            I’m Matthew Howell, a technical program leader with 10+ years of
            experience leading complex engineering programs, managing risk,
            coordinating cross-functional teams, and translating technical
            complexity into execution plans.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#mattbot">
                Ask MattBot <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/Matthew_Howell_Resume.pdf">
                Download Resume <Download className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="ghost" size="lg">
              <Link href="mailto:matthewrhowell@yahoo.com">
                Email Me <Mail className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <Card className="rounded-2xl shadow-sm">
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
      </section>

      <section id="about" className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              About
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              I bridge technical engineering detail with program-level execution.
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              My background spans aerospace systems engineering, technical
              program management, product ownership, propulsion hardware, and AI
              startup execution. I’m focused on roles where technical judgment,
              structured execution, and stakeholder communication directly
              affect product and business outcomes.
            </p>
          </div>
        </div>
      </section>

      <section id="experience" className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Experience
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Technical leadership across aerospace and AI/software delivery.
              </h2>
            </div>
          </div>

          <div className="grid gap-5">
            {experience.map((item) => (
              <Card key={`${item.role}-${item.company}`} className="rounded-2xl">
                <CardContent className="grid gap-4 p-6 md:grid-cols-[0.7fr_1.3fr]">
                  <div>
                    <p className="font-semibold">{item.role}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.company} · {item.period}
                    </p>
                  </div>
                  <p className="leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Portfolio
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Selected work and project artifacts.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <BriefcaseBusiness className="h-6 w-6" />
                <h3 className="mt-5 font-semibold">Program Execution</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Examples of risk management, cost/schedule tradeoffs,
                  stakeholder reporting, and cross-functional delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <MessageSquare className="h-6 w-6" />
                <h3 className="mt-5 font-semibold">AI Startup TPM Work</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Part-time TPM work supporting AI-enabled app development,
                  product planning, and software delivery workflows.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <Map className="h-6 w-6" />
                <h3 className="mt-5 font-semibold">Product Roadmap</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  A Miro-based roadmap artifact showing product thinking,
                  prioritization, and execution planning.
                </p>
                <Button asChild variant="outline" className="mt-5">
                  <Link href="https://miro.com/app/board/uXjVJdyF_SI=/?share_link_id=536883603476" target="_blank">
                    View Miro Board <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="skills" className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Skills
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Tools and capabilities.
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section id="mattbot" className="border-t">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              MattBot
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Ask questions about my background or paste a job description.
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              This will become an AI-powered interactive resume assistant. For
              Phase 1, this is only the visual shell. The OpenAI integration
              comes next.
            </p>
          </div>

          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="rounded-xl border bg-muted/40 p-4">
                <p className="text-sm text-muted-foreground">
                  Hi, I’m MattBot. Ask me about Matthew’s TPM experience,
                  systems engineering background, AI startup work, or fit for a
                  specific job description.
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <Input placeholder="Your name or role, optional" />
                <Textarea
                  placeholder="Paste a question or job description here..."
                  className="min-h-32"
                />
                <Button className="w-full" disabled>
                  Chat integration coming soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer id="contact" className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            Matthew Howell · Technical Program Manager
          </p>

          <div className="flex gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="mailto:matthewrhowell@yahoo.com">
                Email <Mail className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="sm">
              <Link href="https://www.linkedin.com/in/matthewrhowell/" target="_blank">
                LinkedIn <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </main>
  );
}