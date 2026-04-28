import { render, screen } from "@testing-library/react";

import { SiteNavbar } from "./site-navbar";

const items = [
  { label: "Work", href: "#products" },
  { label: "Services", href: "#services" },
] as const;

describe("SiteNavbar", () => {
  it("renders the shared navigation items and contact actions", () => {
    render(
      <SiteNavbar
        contactEmail="voltservice@metalbrain.net"
        domain="metalbrain.net"
        items={[...items]}
      />,
    );

    expect(screen.getByText("VOLTSERVICE LTD")).toBeInTheDocument();
    expect(screen.getByText("metalbrain.net")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /open navigation/i }),
    ).toBeInTheDocument();

    expect(screen.getAllByRole("link", { name: "Work" }).length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /start a project/i })[0],
    ).toHaveAttribute("href", "mailto:voltservice@metalbrain.net");
  });
});
