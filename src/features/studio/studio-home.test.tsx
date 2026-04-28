import { render, screen } from "@testing-library/react";

import { StudioHome } from "./studio-home";

describe("StudioHome", () => {
  it("renders the repositioned studio story and portfolio proof", () => {
    render(<StudioHome />);

    expect(
      screen.getByRole("heading", {
        name: /a sharper public face for the products and systems we build/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /recent product work/i }),
    ).toBeInTheDocument();

    expect(screen.getByText("BuildersHub")).toBeInTheDocument();
    expect(screen.getByText("PaySmart")).toBeInTheDocument();
    expect(screen.getByText("VoltPay")).toBeInTheDocument();
  });

  it("exposes the primary actions and contact email", () => {
    render(<StudioHome />);

    expect(
      screen.getByRole("link", { name: /review the work/i }),
    ).toHaveAttribute("href", "#products");

    const mailLinks = screen.getAllByRole("link", { name: /start a project/i });
    expect(mailLinks[0]).toHaveAttribute("href", "mailto:voltservice@metalbrain.net");

    expect(screen.getByText("voltservice@metalbrain.net")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: /main/i }),
    ).toBeInTheDocument();
  });
});
