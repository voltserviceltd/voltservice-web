"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Sets `data-inview="true"` on each `[data-reveal]` element once it scrolls
 * into view. Mounted once in the site layout; re-runs on navigation. Without
 * IntersectionObserver everything is revealed immediately.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-inview])"),
    );

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
  }, [pathname]);

  return null;
}
