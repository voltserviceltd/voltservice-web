import Image from "next/image";
import Link from "next/link";
import { contactRoute, primaryNavRoutes } from "@/lib/router/routes";
import { founderLinkedInUrl } from "@/lib/content/service/founder-content";
import linkedinIcon from "@/assets/social/linkedin.png";

const footerRoutes = [...primaryNavRoutes, contactRoute];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-surface-inverse text-text-on-inverse">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-semibold">VoltService Ltd</p>
            <p className="mt-2 text-sm text-text-on-inverse/70">
              VoltService Ltd designs and develops reliable websites,
              applications, and digital systems for businesses that need
              practical software support.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {footerRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="text-sm text-text-on-inverse/80 transition-colors hover:text-text-on-inverse"
                >
                  {route.label}
                </Link>
              ))}
            </nav>

            <a
              href={founderLinkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <Image
                src={linkedinIcon}
                alt="VoltService on LinkedIn"
                width={20}
                height={20}
                className="size-5"
              />
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs text-text-on-inverse/60">
          © {year} VoltService Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
