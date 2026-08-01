"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { contactRoute, primaryCta, primaryNavRoutes } from "@/lib/router/routes";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { cn } from "@/lib/utils";

const homeRoute = { href: "/", label: "Home" };
const navLinks = [homeRoute, ...primaryNavRoutes, contactRoute];

function isActiveRoute(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the menu whenever the route changes, instead of leaving it open
  // behind a new page. Adjusting state during render (rather than in an
  // effect) avoids an extra cascading render on every navigation.
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-text-primary"
        >
          VOLTSERVICE LTD
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border-subtle text-text-primary nav:hidden"
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          <span className="sr-only">{open ? "Close navigation menu" : "Open navigation menu"}</span>
        </button>

        <div
          id="primary-navigation"
          className={cn(
            "absolute inset-x-0 top-full flex-col items-stretch gap-1 border-b border-border-subtle bg-surface px-6 pb-4 shadow-sm",
            "nav:static nav:flex nav:w-auto nav:flex-row nav:items-center nav:gap-6 nav:border-none nav:bg-transparent nav:p-0 nav:shadow-none",
            open ? "flex" : "hidden",
          )}
        >
          {navLinks.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              aria-current={isActiveRoute(pathname, route.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-3 text-sm font-medium text-text-primary transition-colors hover:text-accent-primary nav:py-2",
                isActiveRoute(pathname, route.href) && "text-accent-primary",
              )}
            >
              {route.label}
            </Link>
          ))}

          <div className="mt-2 flex items-center gap-3 border-t border-border-subtle pt-3 nav:mt-0 nav:border-none nav:pt-0">
            <ModeToggle />
            <Link
              href={primaryCta.href}
              className="rounded-lg bg-accent-primary px-4 py-2.5 text-sm font-medium text-text-on-inverse transition-colors hover:bg-accent-primary-hover nav:py-2"
            >
              {primaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
