import { fireEvent, render, screen } from "@testing-library/react";

import { ContactForm } from "./contact-form";

describe("ContactForm", () => {
  it("shows an error summary and inline errors when required fields are empty", () => {
    render(<ContactForm email="voltservice@metalbrain.net" />);

    fireEvent.click(screen.getByRole("button", { name: /open in my email app/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(/there's a problem/i);
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/work email/i)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/what would you like to fix or build/i)).toHaveAttribute("aria-invalid", "true");
  });

  it("rejects a malformed email address", () => {
    render(<ContactForm email="voltservice@metalbrain.net" />);

    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: "Sam" } });
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: "sam@" } });
    fireEvent.change(screen.getByLabelText(/what would you like/i), { target: { value: "A new website" } });
    fireEvent.click(screen.getByRole("button", { name: /open in my email app/i }));

    expect(screen.getAllByText(/enter an email address like/i).length).toBeGreaterThan(0);
  });

  it("labels optional fields and exposes the needs as checkboxes", () => {
    render(<ContactForm email="voltservice@metalbrain.net" />);

    expect(screen.getByLabelText(/company/i)).not.toBeRequired();
    expect(screen.getByRole("group", { name: /what do you need/i })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /a website/i })).not.toBeChecked();
  });
});
