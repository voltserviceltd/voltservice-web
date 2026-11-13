"use client";

import { useRef, useState } from "react";

import { Button } from "@/shared/ui/button";
import { ChoiceChips, TextArea, TextField, formStyles } from "@/shared/ui/form";

import styles from "./contact.module.css";

const needs = ["A website", "A web or mobile app", "An internal tool", "Support for existing software", "Not sure yet"] as const;

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Static-site enquiry form. Nothing is sent to a server or a third party: on submit
 * it opens the visitor's email app with the message ready to send.
 */
export function ContactForm({ email }: { email: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [chosen, setChosen] = useState<string[]>([]);
  const [ready, setReady] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Enter your name";
    if (!from) next.email = "Enter your email address";
    else if (!EMAIL.test(from)) next.email = "Enter an email address like name@company.co.uk";
    if (!message) next.message = "Tell us a little about what you need";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      setReady(null);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    const subject = `Project enquiry from ${name}${company ? ` (${company})` : ""}`;
    const body = [
      message,
      "",
      chosen.length ? `Looking for: ${chosen.join(", ")}` : null,
      `Name: ${name}`,
      company ? `Company: ${company}` : null,
      `Reply to: ${from}`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setReady(href);
    window.location.href = href;
  }

  const errorList = Object.entries(errors) as [keyof Errors, string][];

  return (
    <form className={styles.form} noValidate onSubmit={onSubmit}>
      {errorList.length > 0 ? (
        <div aria-labelledby="error-summary-title" className={formStyles.errorSummary} ref={summaryRef} role="alert" tabIndex={-1}>
          <p id="error-summary-title">
            <strong>There&apos;s a problem</strong>
          </p>
          <ul>
            {errorList.map(([field, message]) => (
              <li key={field}>
                <a href={`#${field}`}>{message}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className={styles.row}>
        <TextField autoComplete="name" error={errors.name} id="name" label="Your name" />
        <TextField autoComplete="organization" id="company" label="Company" optional />
      </div>
      <TextField
        autoComplete="email"
        error={errors.email}
        hint="We only use this to reply to you."
        id="email"
        inputMode="email"
        label="Work email"
        type="email"
      />
      <ChoiceChips legend="What do you need?" name="needs" onChange={setChosen} options={needs} value={chosen} />
      <TextArea
        error={errors.message}
        hint="A few lines is plenty: what happens today, and what would make it easier."
        id="message"
        label="What would you like to fix or build?"
      />

      <div className={styles.submitRow}>
        <Button type="submit">Open in my email app</Button>
        <p className={styles.note}>
          This opens your own email app with the message filled in — nothing is sent until you press send.
        </p>
      </div>

      {ready ? (
        <p aria-live="polite" className={styles.ready}>
          Your email app should now be open. If it isn&apos;t, email us at{" "}
          <a href={`mailto:${email}`}>{email}</a> or <a href={ready}>try again</a>.
        </p>
      ) : null}
    </form>
  );
}
