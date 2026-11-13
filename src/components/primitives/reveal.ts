import type { CSSProperties } from "react";

/**
 * Spread onto an element to make it rise in when scrolled into view (see
 * RevealObserver and the `[data-reveal]` rules in globals.css). `index`
 * staggers siblings.
 */
export function reveal(index = 0) {
  return {
    "data-reveal": "",
    style: { "--reveal-index": index } as CSSProperties,
  };
}
