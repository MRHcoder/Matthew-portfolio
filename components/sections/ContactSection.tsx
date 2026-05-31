import Link from "next/link";
import { ExternalLink, Mail, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { links } from "@/data/links";
import { profile } from "@/data/profile";

export function ContactSection() {
  return (
    <section id="contact" className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Contact
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Let’s connect.
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              Reach out by email, view my LinkedIn profile, or download my
              resume for a more traditional summary of my background.
            </p>
          </div>

          <Card className="rounded-2xl">
            <CardContent className="grid gap-3 p-6 sm:grid-cols-3">
              <Button asChild variant="outline">
                <Link href={links.email}>
                  Email <Mail className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline">
                <Link href={links.linkedin} target="_blank">
                  LinkedIn <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline">
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