import Image from "next/image";
import Link from "next/link";
import { contactRoute, legalRoutes, primaryNavRoutes } from "@/lib/router/routes";
import { founderLinkedInUrl } from "@/lib/content/service/founder-content";
import { buildLegalLine, companyContent } from "@/lib/content/service/company-content";
import { Logo } from "@/components/layout/logo";
import linkedinIcon from "@/assets/social/linkedin.png";

const footerRoutes = [...primaryNavRoutes, contactRoute];

const linkClass =
  "bg-[linear-gradient(var(--color-volt),var(--color-volt))] bg-[length:0_2px] bg-bottom bg-no-repeat transition-[background-size] duration-200 hover:bg-[length:100%_2px]";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[0.8125rem] font-medium tracking-[0.08em] text-volt uppercase">
      {children}
    </p>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-310 px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo onInverse />
            <p className="text-paper/85">
              VoltService Ltd designs and develops reliable websites, applications, and digital
              systems for businesses that need practical software support.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-4">
            <FooterHeading>Company</FooterHeading>
            <ul className="flex flex-col gap-3">
              {footerRoutes.map((route) => (
                <li key={route.href}>
                  <Link href={route.href} className={linkClass}>
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <FooterHeading>Get in touch</FooterHeading>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`mailto:${companyContent.email}`} className={`${linkClass} break-all`}>
                  {companyContent.email}
                </a>
              </li>
              <li>
                <Link href="/research" className={linkClass}>
                  Contractor research
                </Link>
              </li>
              <li>
                <a
                  href={founderLinkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100"
                >
                  <Image src={linkedinIcon} alt="" width={20} height={20} className="size-5" />
                  <span className={linkClass}>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Legal" className="flex flex-col gap-4">
            <FooterHeading>Legal</FooterHeading>
            <ul className="flex flex-col gap-3">
              {legalRoutes.map((route) => (
                <li key={route.href}>
                  <Link href={route.href} className={linkClass}>
                    {route.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={companyContent.companiesHouseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Companies House record
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-paper/20 pt-6 text-sm text-paper/80">
          {buildLegalLine(year)}
        </p>
      </div>
    </footer>
  );
}
