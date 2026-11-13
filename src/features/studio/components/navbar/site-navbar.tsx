"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ButtonLink } from "@/shared/ui/button";

import { contactHref } from "../content/content";
import type { SiteNavbarProps } from "./components.type";
import { Logo } from "./logo";
import styles from "./studio-navbar.module.css";

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  const clean = pathname.replace(/\/$/, "") || "/";
  return clean === href || clean.startsWith(`${href}/`);
}

export function SiteNavbar({ items }: SiteNavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <div className={styles.bar}>
        <Logo />

        <nav aria-label="Main" className={styles.nav}>
          {items.map((item) => (
            <Link
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={styles.navLink}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link
            aria-current={isActive(pathname, contactHref) ? "page" : undefined}
            className={styles.navLink}
            href={contactHref}
          >
            Contact
          </Link>
          <ButtonLink className={styles.cta} href={contactHref}>
            Start a project
          </ButtonLink>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button aria-label="Open menu" className={styles.menuButton} type="button">
              <MenuIcon aria-hidden="true" />
            </button>
          </SheetTrigger>

          <SheetContent className={styles.sheet} showCloseButton={false} side="top">
            <div className={styles.sheetTop}>
              <SheetTitle asChild>
                <span>
                  <Logo />
                </span>
              </SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <SheetClose asChild>
                <button aria-label="Close menu" className={styles.menuButton} type="button">
                  <XIcon aria-hidden="true" />
                </button>
              </SheetClose>
            </div>

            <nav aria-label="Mobile" className={styles.mobileNav}>
              {[...items, { label: "Contact", href: contactHref }].map((item, index) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={styles.mobileLink}
                    href={item.href}
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            <div className={styles.sheetFooter}>
              <SheetClose asChild>
                <ButtonLink fullWidth href={contactHref} variant="dark">
                  Start a project
                </ButtonLink>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
