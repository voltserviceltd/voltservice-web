import "@testing-library/jest-dom/vitest";
import React from "react";

import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({
    alt,
    blurDataURL,
    fill,
    placeholder,
    priority,
    quality,
    sizes,
    src,
    ...props
  }: {
    alt?: string;
    blurDataURL?: string;
    fill?: boolean;
    placeholder?: string;
    priority?: boolean;
    quality?: number;
    sizes?: string;
    src: string;
  } & React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", {
      alt: alt ?? "",
      "data-blur": blurDataURL,
      "data-fill": fill ? "true" : undefined,
      "data-placeholder": placeholder,
      "data-priority": priority ? "true" : undefined,
      "data-quality": quality,
      "data-sizes": sizes,
      src,
      ...props,
    }),
}));
