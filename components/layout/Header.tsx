"use client";

import Link from "next/link";

import { navigationItems } from "@/config/navigation";
import { profile } from "@/data/profile";

export function Header() {
  function handleNavClick(href: string) {
    if (!href.startsWith("#")) {
      return;
    }

    const sectionId = href.replace("#", "");
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.pushState(null, "", href);
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="#"
          className="font-semibold tracking-tight"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.pushState(null, "", "/");
          }}
        >
          {profile.name}
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {navigationItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavClick(item.href)}
              className="cursor-pointer transition hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}