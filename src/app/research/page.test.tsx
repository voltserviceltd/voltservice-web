import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ResearchPage from "@/app/research/page";

describe("ResearchPage", () => {
  it("offers both a reply and an opt-out by email", () => {
    render(<ResearchPage />);

    expect(screen.getByRole("heading", { level: 1, name: /listening to small contractors/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /happy to talk/i })).toHaveAttribute(
      "href",
      expect.stringMatching(/^mailto:voltservice@metalbrain\.net\?subject=/),
    );
    expect(screen.getByRole("link", { name: /no thanks, remove me/i })).toHaveAttribute(
      "href",
      expect.stringContaining("No%20thanks"),
    );
  });
});
