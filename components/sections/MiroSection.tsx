import Link from "next/link";
import { ExternalLink, Maximize2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { themeConfig } from "@/config/theme";
import { links } from "@/data/links";

export function MiroSection() {
  const hasEmbed = Boolean(links.miroEmbed);

  return (
    <section id="miro" className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
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
          </div>

          <Button asChild variant="outline">
            <Link href={links.miroBoard} target="_blank">
              Open Full Board <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Card className={`rounded-2xl ${themeConfig.miroCardGlow}`}>
          <CardContent className="p-4 md:p-6">
            {hasEmbed ? (
              <>
                <div className="hidden overflow-hidden rounded-xl border bg-background md:block">
                  <div className="flex items-center justify-between border-b px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">
                        Embedded Product Roadmap
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Pan and zoom inside the board preview.
                      </p>
                    </div>

                    <Button asChild size="sm" variant="ghost">
                      <Link href={links.miroBoard} target="_blank">
                        Expand <Maximize2 className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <iframe
                    src={links.miroEmbed}
                    width="100%"
                    height="620"
                    allowFullScreen
                    className="border-0"
                    title="Matthew Howell Miro Product Roadmap"
                  />
                </div>

                <div className="rounded-xl border bg-muted/40 p-6 text-center md:hidden">
                  <p className="text-sm leading-7 text-muted-foreground">
                    The embedded Miro board is best viewed on a larger screen.
                    Open the full board to view the roadmap on mobile.
                  </p>

                  <Button asChild className="mt-5">
                    <Link href={links.miroBoard} target="_blank">
                      Open Miro Board <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex min-h-64 items-center justify-center rounded-xl border bg-muted/40 p-6 text-center">
                <p className="max-w-md text-sm leading-7 text-muted-foreground">
                  Miro embed URL has not been added yet. Add the iframe src URL
                  to data/links.ts under miroEmbed.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}