import Link from "next/link";
import { primaryNavRoutes } from "@/lib/router/routes";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-surface-inverse text-text-on-inverse">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-semibold">VoltService Ltd</p>
            <p className="mt-2 text-sm text-text-on-inverse/70">
              Custom software development for B2B teams — including PaySmart
              and VoltConnect, built and operated by VoltService.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {primaryNavRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-sm text-text-on-inverse/80 transition-colors hover:text-text-on-inverse"
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-10 text-xs text-text-on-inverse/60">
          © {year} VoltService Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
