import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { themeConfig } from "@/config/theme";
import { links } from "@/data/links";

export function MiroSection() {
  const hasEmbed = Boolean(links.miroEmbed);

  return (
    <section id="miro" className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Miro Roadmap
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Product planning, prioritization, and roadmap thinking.
          </h2>

          <p className="mt-5 leading-8 text-muted-foreground">
            This roadmap artifact shows how I think through product scope,
            feature prioritization, delivery sequencing, and cross-functional
            execution.
          </p>

          <Button asChild className="mt-6">
            <Link href={links.miroBoard} target="_blank">
              Open Full Miro Board <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Card className={`rounded-2xl ${themeConfig.miroCardGlow}`}>
          <CardContent className="p-4 md:p-6">
            {hasEmbed ? (
              <div className="hidden overflow-hidden rounded-xl border md:block">
                <iframe
                  src={links.miroEmbed}
                  width="100%"
                  height="600"
                  allowFullScreen
                  className="border-0"
                  title="Matthew Howell Miro Product Roadmap"
                />
              </div>
            ) : (
              <div className="flex min-h-64 items-center justify-center rounded-xl border bg-muted/40 p-6 text-center">
                <p className="max-w-md text-sm leading-7 text-muted-foreground">
                  Miro embed placeholder. In Phase 4, this will become an
                  embedded board preview for desktop users.
                </p>
              </div>
            )}

            <div className="rounded-xl border bg-muted/40 p-6 text-center md:hidden">
              <p className="text-sm leading-7 text-muted-foreground">
                The embedded Miro board is best viewed on a larger screen. Use
                the button above to open the full board.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}