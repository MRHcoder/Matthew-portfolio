"use client";

import { useEffect } from "react";

export function ScrollToTopOnLoad() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const hash = window.location.hash;

    if (hash) {
      const sectionId = hash.replace("#", "");

      window.setTimeout(() => {
        const section = document.getElementById(sectionId);

        if (section) {
          section.scrollIntoView({
            behavior: "auto",
            block: "start",
          });
        }
      }, 100);

      return;
    }

    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }, 0);
  }, []);

  return null;
}