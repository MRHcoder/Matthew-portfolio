import Link from "next/link";
import { FileText, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { themeConfig } from "@/config/theme";
import { links } from "@/data/links";
import { profile } from "@/data/profile";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.369-1.852 3.602 0 4.267 2.371 4.267 5.455v6.288zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t bg-slate-50 bg-[radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.14),_transparent_30%)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-[0.9fr_0.85fr] md:items-center">
          <div>
            <p className={themeConfig.sectionLabel}>Contact</p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Let’s connect.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-950">
              Reach out by email, view my LinkedIn profile, or download my
              resume for a more traditional summary of my background.
            </p>
          </div>

          <Card className="mx-auto w-full max-w-md rounded-3xl border-sky-500/20 bg-white shadow-md">
            <CardContent className="grid gap-3 p-6">
              <Button
                asChild
                size="lg"
                className="h-11 justify-center gap-2 rounded-xl bg-sky-700 text-base font-medium text-white shadow-sm hover:bg-sky-800"
              >
                <Link href={links.email}>
                  <Mail className="h-5 w-5" />
                  Email
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 justify-center gap-2 rounded-xl border-sky-700 bg-white text-base font-medium text-sky-800 shadow-sm hover:bg-sky-50 hover:text-sky-900"
              >
                <Link href={links.linkedin} target="_blank">
                  <LinkedInIcon className="h-5 w-5" />
                  LinkedIn
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 justify-center gap-2 rounded-xl border-sky-700 bg-white text-base font-medium text-sky-800 shadow-sm hover:bg-sky-50 hover:text-sky-900"
              >
                <Link href={profile.resumePath}>
                  <FileText className="h-5 w-5" />
                  Resume
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}