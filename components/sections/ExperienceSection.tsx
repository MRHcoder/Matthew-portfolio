import { Card, CardContent } from "@/components/ui/card";
import { themeConfig } from "@/config/theme";
import { experience } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className={`border-t ${themeConfig.sectionMutedBackground}`}>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Experience
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Technical leadership across aerospace and AI/software delivery.
          </h2>
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
  );
}