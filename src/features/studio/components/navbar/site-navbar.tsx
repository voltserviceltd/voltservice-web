"use client";

import Link from "next/link";
import styles from "./studio-navbar.module.css";
import { MenuIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SiteNavbarProps } from "./components.type";

export function SiteNavbar({ contactEmail, domain, items }: SiteNavbarProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logoLink} href="/">
          <span className={styles.logoIcon}>VS</span>
          <span className={styles.logoTextWrap}>
            <span className={styles.logoTitle}>VOLTSERVICE LTD</span>
            <span className={styles.logoDomain}>{domain}</span>
          </span>
        </Link>

        <div className={styles.desktopNavWrap}>
          <nav aria-label="Main" className={styles.nav}>
            {items.map((item) => (
              <Link className={styles.navLink} href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Button
            asChild
            className={styles.ctaButton}
            size="sm"
            variant="outline"
          >
            <a href={`mailto:${contactEmail}`}>Start a Project</a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              aria-label="Open navigation"
              className={styles.mobileButton}
              size="icon"
              variant="outline"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent
            className={styles.sheetContent}
            showCloseButton={false}
            side="right"
          >
            <SheetHeader className={styles.sheetHeader}>
              <div className={styles.sheetHeaderInner}>
                <div className={styles.sheetTitleWrap}>
                  <SheetTitle className={styles.sheetTitle}>
                    VOLTSERVICE LTD
                  </SheetTitle>
                  <SheetDescription className={styles.sheetDescription}>
                    Product studio behind PaySmart.
                  </SheetDescription>
                </div>

                <SheetClose asChild>
                  <Button
                    aria-label="Close navigation"
                    className={styles.mobileButton}
                    size="icon"
                    variant="ghost"
                  >
                    <XIcon />
                  </Button>
                </SheetClose>
              </div>
            </SheetHeader>

            <nav className={styles.mobileNav} aria-label="Mobile">
              {items.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link className={styles.mobileLink} href={item.href}>
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            <SheetFooter className={styles.sheetFooter}>
              <p className={styles.footerText}>
                For product builds, studio sites, and high-trust web systems.
              </p>
              <Button asChild className={styles.fullWidthButton}>
                <a href={`mailto:${contactEmail}`}>Start a Project</a>
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
