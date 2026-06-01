import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          {profile.name} · {profile.title}
        </p>
      </div>
    </footer>
  );
}