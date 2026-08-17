import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FounderCard } from "@/components/marketing/founder-card";
import { founderLinkedInUrl } from "@/lib/content/service/founder-content";

describe("FounderCard", () => {
  it("opens the founder details dialog when the card is clicked", async () => {
    const user = userEvent.setup();
    render(<FounderCard />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Babatunde Kalejaiye" })).toBeInTheDocument();
  });

  it("links to the founder's LinkedIn profile from inside the dialog", async () => {
    const user = userEvent.setup();
    render(<FounderCard />);

    await user.click(screen.getByRole("button"));

    const linkedinLink = await screen.findByRole("link", { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute("href", founderLinkedInUrl);
  });
});
