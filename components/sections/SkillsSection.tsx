import { Badge } from "@/components/ui/badge";
import { themeConfig } from "@/config/theme";
import { skills } from "@/data/skills";

export function SkillsSection() {
  return (
    <section id="skills" className={`border-t ${themeConfig.sectionGrayBackground}`}>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className={themeConfig.sectionLabel}>
          Skills
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          Tools and capabilities.
        </h2>

        <div className="mt-8 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="rounded-full border-sky-500/20 bg-sky-500/5 px-3 py-1 text-sky-800"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}