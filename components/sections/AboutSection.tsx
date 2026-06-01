import { themeConfig } from "@/config/theme";
import { profile } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="about" className="border-t bg-slate-50/70">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-4xl">
          <p className={themeConfig.sectionLabel}>About</p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            I bridge technical engineering detail with program-level execution.
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {profile.about}
          </p>
        </div>
      </div>
    </section>
  );
}