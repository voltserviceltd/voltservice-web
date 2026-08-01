import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import { homeContent } from "@/lib/content/service/home-content";

describe("HomePage", () => {
  it("renders the hero heading", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: homeContent.hero.title }),
    ).toBeInTheDocument();
  });

  it("links the primary CTA to /contact", () => {
    render(<HomePage />);
    const ctaLinks = screen.getAllByRole("link", { name: "Start a project" });
    expect(ctaLinks.length).toBeGreaterThan(0);
    for (const link of ctaLinks) {
      expect(link).toHaveAttribute("href", "/contact");
    }
  });
});
