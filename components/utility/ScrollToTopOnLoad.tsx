"use client";

import { useEffect } from "react";

export function ScrollToTopOnLoad() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return null;
}