"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { contactRoute, primaryCta, primaryNavRoutes } from "@/lib/router/routes";
import { Logo } from "@/components/layout/logo";
import { buttonClasses } from "@/components/primitives/button-link";
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
  const [scrolled, setScrolled] = useState(false);

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

  // Shrink the floating bar once the visitor scrolls past the hero top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-4 z-50 mt-4 px-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "relative mx-auto flex max-w-310 items-center justify-between gap-6 rounded-full border-2 border-line bg-surface py-2.5 pr-2.5 pl-4 shadow-hard-sm transition-[min-height,box-shadow,padding] duration-200 nav:pl-5",
          scrolled ? "min-h-15 shadow-hard nav:py-1.5" : "min-h-16 nav:min-h-18",
        )}
      >
        <Logo />

        <button
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-11 items-center justify-center rounded-full border-2 border-ink bg-volt text-ink nav:hidden"
        >
          {open ? <X className="size-5.5" aria-hidden /> : <Menu className="size-5.5" aria-hidden />}
          <span className="sr-only">{open ? "Close navigation menu" : "Open navigation menu"}</span>
        </button>

        <div
          id="primary-navigation"
          className={cn(
            "absolute inset-x-0 top-[calc(100%+0.75rem)] flex-col items-stretch gap-1 rounded-3xl border-2 border-ink bg-volt p-4 text-ink shadow-hard",
            "nav:static nav:flex nav:w-auto nav:flex-row nav:items-center nav:gap-8 nav:rounded-none nav:border-none nav:bg-transparent nav:p-0 nav:text-text-primary nav:shadow-none",
            open ? "flex" : "hidden",
          )}
        >
          {navLinks.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              aria-current={isActiveRoute(pathname, route.href) ? "page" : undefined}
              className={cn(
                "relative rounded-xl px-3 py-3 font-display text-2xl font-extrabold tracking-tight",
                "nav:px-0 nav:py-1 nav:font-sans nav:text-base nav:font-semibold nav:tracking-normal",
                "nav:after:absolute nav:after:inset-x-0 nav:after:-bottom-0.5 nav:after:h-1 nav:after:origin-left nav:after:scale-x-0 nav:after:rounded-full nav:after:bg-volt nav:after:transition-transform nav:after:duration-200 nav:hover:after:scale-x-100",
                isActiveRoute(pathname, route.href) && "underline decoration-4 underline-offset-6 nav:no-underline nav:after:scale-x-100",
              )}
            >
              {route.label}
            </Link>
          ))}

          <div className="mt-3 flex items-center gap-3 border-t-2 border-ink/20 pt-4 nav:mt-0 nav:border-none nav:pt-0">
            <ModeToggle />
            <Link href={primaryCta.href} className={cn(buttonClasses("primary"), "flex-1 nav:flex-none nav:min-h-12")}>
              <span>{primaryCta.label}</span>
              <ArrowRight aria-hidden className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
