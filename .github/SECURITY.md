# Security Policy

## Supported Branches

The VoltService website is under active development. Security fixes are prioritized for:

| Branch | Status |
| --- | --- |
| `main` | Supported |
| `develop` | Best-effort support |
| Feature branches | Not supported |

## Reporting a Vulnerability

Do not disclose security vulnerabilities in public issues or pull requests.

Preferred process:

1. Open a private GitHub Security Advisory for this repository.
2. Include the affected path, impact, reproducible steps, and suggested mitigation.
3. Wait for triage before public disclosure.

If a private advisory is unavailable, contact the repository maintainer through the
configured `@MetalHuman38` owner channel and mark the message as `Security: Confidential`.

## What to Expect

- Initial triage target: within 3 business days
- Status updates during investigation and fix rollout
- Coordinated disclosure after patch validation

## Scope Notes

Security-sensitive areas include:

- Next.js route handlers, metadata, sitemap, and robots behavior
- The contact/inquiry form, reCAPTCHA Enterprise verification, and Firestore writes
- Deployment configuration, environment variables, and GitHub Actions
- Cloud Run service account permissions and Application Default Credentials usage
- Dependency updates that affect runtime or build-time execution
