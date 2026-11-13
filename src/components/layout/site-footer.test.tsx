import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { SiteFooter } from "@/components/layout/site-footer";

describe("SiteFooter", () => {
  it("shows the legal company details UK business websites must display", () => {
    render(<SiteFooter />);
    const footer = screen.getByRole("contentinfo");

    expect(within(footer).getByText(/company number 16613560/)).toBeInTheDocument();
    expect(
      within(footer).getByText(/165 Gleneagle Road, Ground Floor, Lambeth, London, England, SW16 6AZ/),
    ).toBeInTheDocument();
  });

  it("links the privacy policy, terms and Companies House record", () => {
    render(<SiteFooter />);
    const legal = screen.getByRole("navigation", { name: "Legal" });

    expect(within(legal).getByRole("link", { name: /privacy policy/i })).toHaveAttribute("href", "/privacy");
    expect(within(legal).getByRole("link", { name: /terms of use/i })).toHaveAttribute("href", "/terms");
    expect(within(legal).getByRole("link", { name: /companies house/i })).toHaveAttribute(
      "href",
      expect.stringContaining("/company/16613560"),
    );
  });
});
