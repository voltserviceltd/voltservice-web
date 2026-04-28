"use client";

import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SiteNavbarProps } from "./components.type";




export function SiteNavbar({ contactEmail, domain, items }: SiteNavbarProps) {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex min-h-19 w-[min(100%-2rem,74rem)] p-5 items-center justify-between gap-4">

        <a
          className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          href="#top"
        >
          <span className="inline-flex size-11 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            VS
          </span>
          <span className="grid gap-0.5">
            <span className="text-[0.98rem] font-semibold text-foreground">
              VOLTSERVICE LTD
            </span>
            <span className="text-[0.88rem] text-muted-foreground">
              {domain}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-3 md:flex">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-6">
              {items.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent px-3 text-[0.95rem] font-medium text-muted-foreground hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground",
                    )}
                  >
                    <a href={item.href}>{item.label}</a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

        <div className="flex flex-wrap items-center gap-2 md:flex-row">
          <Button asChild size="lg" variant="outline" className="hidden md:inline-flex">
            <a href={`mailto:${contactEmail}`}>Start a Project</a>
          </Button>
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              aria-label="Open navigation"
              className="md:hidden"
              size="icon-sm"
              variant="outline"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="w-[min(20rem,100vw)] px-0" side="right">
            <SheetHeader className="border-b border-border px-5 pb-4 pt-2">
              <SheetTitle className="text-left text-base font-semibold">
                Voltservice
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-1 px-3 py-3">
              {items.map((item) => (
                <SheetClose asChild key={item.href}>
                  <a
                    className="flex h-11 items-center rounded-md px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </SheetClose>
              ))}
            </nav>

            <SheetFooter className="px-4">
              <Button asChild className="w-full">
                <a href={`mailto:${contactEmail}`}>Start a Project</a>
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  );
}
