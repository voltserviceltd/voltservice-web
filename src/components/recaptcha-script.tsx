"use client";

import Script from "next/script";
import { clientEnv } from "@/lib/env/env";

/**
 * Loads the reCAPTCHA Enterprise script. Mount this only on the page that
 * has the inquiry form (Phase 2) — not in the root layout — so pages
 * without a form don't pay for it (Core Web Vitals matter for this site's
 * SEO strategy, see doc/nextjs-migration-plan.md).
 */
export function RecaptchaScript() {
  if (!clientEnv.recaptchaSiteKey) {
    return null;
  }

  return (
    <Script
      src={`https://www.google.com/recaptcha/enterprise.js?render=${clientEnv.recaptchaSiteKey}`}
      strategy="afterInteractive"
    />
  );
}
