import { render, screen, within } from "@testing-library/react";

import { navigation } from "../content/content";
import { SiteNavbar } from "./site-navbar";

describe("SiteNavbar", () => {
  it("renders the main navigation, contact link and primary action", () => {
    render(<SiteNavbar items={navigation} />);

    expect(screen.getByRole("link", { name: /voltservice home/i })).toHaveAttribute("href", "/");

    const main = screen.getByRole("navigation", { name: "Main" });
    for (const item of navigation) {
      expect(within(main).getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);
    }

    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: /start a project/i })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });
});
