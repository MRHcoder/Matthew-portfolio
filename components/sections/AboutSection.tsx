import { profile } from "@/data/profile";

export function AboutSection() {
  return (
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
            {profile.about}
          </p>
        </div>
      </div>
    </section>
  );
}