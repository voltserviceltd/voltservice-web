import { render, screen, within } from "@testing-library/react";

import { StudioHome } from "./studio-home";

describe("StudioHome", () => {
  it("leads with the hero headline and primary actions", () => {
    render(<StudioHome />);

    expect(screen.getByRole("heading", { level: 1, name: /software that takes the busywork off your plate/i })).toBeInTheDocument();

    const startLinks = screen.getAllByRole("link", { name: /start a project/i });
    expect(startLinks.some((link) => link.getAttribute("href") === "/contact")).toBe(true);
    expect(screen.getByRole("link", { name: /see our work/i })).toHaveAttribute("href", "/work");
  });

  it("shows services, products, process, research and the founder", () => {
    render(<StudioHome />);

    expect(screen.getByRole("heading", { name: /four ways we take work off your plate/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "PaySmart" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "VoltConnects" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /small steps\. no surprises/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /listening to small contractors/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /share how you do it/i })).toHaveAttribute("href", "/research");
    expect(screen.getByAltText(/babatunde kalejaiye/i)).toBeInTheDocument();
  });

  it("carries the company's legal details in the footer", () => {
    render(<StudioHome />);

    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByText(/company number 16613560/i)).toBeInTheDocument();
    expect(within(footer).getByText(/165 Gleneagle Road, Ground Floor, Lambeth, London, England, SW16 6AZ/)).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /privacy notice/i })).toHaveAttribute("href", "/privacy");
    expect(within(footer).getByRole("link", { name: "voltservice@metalbrain.net" })).toHaveAttribute(
      "href",
      "mailto:voltservice@metalbrain.net",
    );
  });

  it("gives the marquee a pause control", () => {
    render(<StudioHome />);
    expect(screen.getByRole("button", { name: /pause scrolling banner/i })).toBeInTheDocument();
  });
});
