"use client";

import { useEffect } from "react";

/**
 * Observes every element with `data-reveal` and sets `data-inview="true"` once it
 * scrolls into view. Mount once per page (the studio shell does this). Styling lives
 * in tokens/motion.css. Without IntersectionObserver, everything is revealed at once.
 */
export function RevealObserver() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => (el.dataset.inview = "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.inview = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
