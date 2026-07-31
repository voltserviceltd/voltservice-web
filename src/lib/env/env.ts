/**
 * Single source of truth for environment configuration. Nothing in the app
 * should read `process.env` directly outside this file — see doc/nextjs-migration-plan.md.
 *
 * Client-safe values are exposed via `clientEnv` (must be `NEXT_PUBLIC_*`,
 * inlined into the browser bundle at build time). Everything else is
 * server-only and stays out of `clientEnv` on purpose.
 */

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const clientEnv = {
  siteUrl: requireEnv("NEXT_PUBLIC_SITE_URL"),
  // Not required yet: no component reads this until the inquiry form
  // (Phase 2) wires up reCAPTCHA Enterprise. Left optional so the build
  // doesn't depend on a credential that hasn't been created in GCP yet.
  recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
} as const;

export const serverEnv = {
  // Cloud Run sets GOOGLE_CLOUD_PROJECT automatically; GCP_PROJECT_ID is only
  // needed as an explicit override for local development.
  gcpProjectId:
    process.env.GCP_PROJECT_ID ?? process.env.GOOGLE_CLOUD_PROJECT ?? "",
} as const;
