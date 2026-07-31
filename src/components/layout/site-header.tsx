import Link from "next/link";
import { contactRoute, primaryNavRoutes } from "@/lib/router/routes";
import { ModeToggle } from "@/components/theme/mode-toggle";

// Mobile nav (drawer/menu) is deferred to Phase 1 alongside the real pages —
// this scaffold intentionally has no nav on small screens yet.
export function SiteHeader() {
  return (
    <header className="border-b border-border-subtle bg-surface">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-text-primary"
        >
          VoltService
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {primaryNavRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-sm font-medium text-text-primary transition-colors hover:text-accent-primary"
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Link
            href={contactRoute.href}
            className="rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-text-on-inverse transition-colors hover:bg-accent-primary-hover"
          >
            {contactRoute.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
