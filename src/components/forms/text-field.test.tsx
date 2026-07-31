import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField } from "@/components/forms/text-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { CheckboxField } from "@/components/forms/checkbox-field";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().min(1, "Email is required.").email("Enter a valid email."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  agreeToContact: z.literal(true, {
    message: "You must agree to be contacted.",
  }),
});

type FormValues = z.infer<typeof schema>;

function TestForm({ onSubmit }: { onSubmit: (values: FormValues) => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", message: "", agreeToContact: false as true },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <TextField control={form.control} name="email" label="Email" type="email" />
      <TextareaField control={form.control} name="message" label="Message" />
      <CheckboxField
        control={form.control}
        name="agreeToContact"
        label="I agree to be contacted"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

describe("Field-based form adapters", () => {
  it("blocks submission and surfaces zod error messages for invalid input", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Email is required.")).toBeInTheDocument();
      expect(
        screen.getByText("Message must be at least 10 characters."),
      ).toBeInTheDocument();
      expect(
        screen.getByText("You must agree to be contacted."),
      ).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits with the validated values once all fields are valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Email"), "buyer@example.com");
    await user.type(
      screen.getByLabelText("Message"),
      "We need a new customer portal.",
    );
    await user.click(screen.getByLabelText("I agree to be contacted"));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        {
          email: "buyer@example.com",
          message: "We need a new customer portal.",
          agreeToContact: true,
        },
        expect.anything(),
      );
    });
  });
});
