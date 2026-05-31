import { Badge } from "@/components/ui/badge";
import { themeConfig } from "@/config/theme";
import { skills } from "@/data/skills";

export function SkillsSection() {
  return (
    <section id="skills" className={`border-t ${themeConfig.sectionMutedBackground}`}>
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
  );
}