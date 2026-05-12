import { render, screen } from "@testing-library/react";

import { StudioHome } from "./studio-home";

describe("StudioHome", () => {
  it("renders the studio entry point and portfolio preview", () => {
    render(<StudioHome />);

    expect(
      screen.getByRole("heading", {
        name: /build the product moments that matter/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /selected product proof/i }),
    ).toBeInTheDocument();

    expect(screen.getAllByText("PaySmart").length).toBeGreaterThan(0);
    expect(screen.getByText(/live fintech product/i)).toBeInTheDocument();
    expect(screen.getAllByText("BuildersHub").length).toBeGreaterThan(0);
    expect(screen.getAllByText("VoltPay").length).toBeGreaterThan(0);
  });

  it("exposes the primary actions and contact email", () => {
    render(<StudioHome />);

    expect(
      screen.getByRole("link", { name: /view products/i }),
    ).toHaveAttribute("href", "/products");

    const startProjectHrefs = screen
      .getAllByRole("link", { name: /start a project/i })
      .map((link) => link.getAttribute("href"));
    expect(startProjectHrefs).toContain("/contact");
    expect(startProjectHrefs).toContain("mailto:voltservice@metalbrain.net");

    expect(screen.getByText("voltservice@metalbrain.net")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: /main/i }),
    ).toBeInTheDocument();
  });
});
