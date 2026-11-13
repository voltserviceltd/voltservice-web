import type { CSSProperties } from "react";

/**
 * Spread onto an element to make it reveal on scroll (see RevealObserver).
 * `index` staggers siblings by --duration-stagger each.
 */
export function reveal(index = 0) {
  return {
    "data-reveal": "",
    style: { "--reveal-index": index } as CSSProperties,
  };
}
