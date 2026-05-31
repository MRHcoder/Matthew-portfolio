import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { links } from "@/data/links";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer id="contact" className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          {profile.name} · {profile.title}
        </p>

        <div className="flex gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href={links.email}>
              Email <Mail className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="sm">
            <Link href={links.linkedin} target="_blank">
              LinkedIn <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}