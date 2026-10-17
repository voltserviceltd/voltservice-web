import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SiteLayoutContent } from "@/components/layout/site-layout-content";

vi.mock("@/components/layout/site-header", () => ({
  SiteHeader: () => (
    <header>
      <button type="button">Home</button>
    </header>
  ),
}));

vi.mock("@/components/layout/site-footer", () => ({
  SiteFooter: () => (
    <footer>
      <a href="/privacy">Privacy</a>
    </footer>
  ),
}));

describe("SiteLayoutContent", () => {
  it("places the skip link first and points it at the focusable main region", () => {
    const { container } = render(
      <SiteLayoutContent>
        <p>Page content</p>
      </SiteLayoutContent>,
    );

    const skipLink = screen.getByRole("link", { name: "Skip to content" });
    const main = screen.getByRole("main");
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [contenteditable="true"], [tabindex]:not([tabindex="-1"])',
    );

    expect(focusableElements[0]).toBe(skipLink);
    expect(skipLink).toHaveAttribute("href", "#main-content");
    expect(main).toHaveAttribute("id", "main-content");
    expect(main).toHaveAttribute("tabindex", "-1");
    expect(container.querySelector(skipLink.getAttribute("href") ?? "")).toBe(main);
  });
});
