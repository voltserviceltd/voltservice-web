import Image from "next/image";
import Link from "next/link";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { founderContent, isValidFounderLink } from "@/lib/content/service/founder-content";
import type { FounderLink } from "@/lib/content/service/founder-content";

function FounderLinkIcon({ icon }: { icon: FounderLink["icon"] }) {
  if (!icon) return null;
  return <Image src={icon.src} alt={icon.alt} width={16} height={16} className="size-4" />;
}

export function FounderDetailsDialog() {
  const validLinks = founderContent.links.filter((link) => isValidFounderLink(link.href));

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{founderContent.details.title}</DialogTitle>
        <DialogDescription>{founderContent.details.subtitle}</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-3 text-sm text-text-primary">
        {founderContent.details.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {validLinks.length > 0 && (
        <div className="flex flex-wrap gap-5 border-t-2 border-border-subtle pt-4">
          {validLinks.map((link) =>
            link.href.startsWith("https://") ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[linear-gradient(var(--color-volt),var(--color-volt))] bg-[length:100%_3px] bg-bottom bg-no-repeat pb-0.5 text-sm font-semibold text-text-primary"
              >
                <FounderLinkIcon icon={link.icon} />
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 bg-[linear-gradient(var(--color-volt),var(--color-volt))] bg-[length:100%_3px] bg-bottom bg-no-repeat pb-0.5 text-sm font-semibold text-text-primary"
              >
                <FounderLinkIcon icon={link.icon} />
                {link.label}
              </Link>
            ),
          )}
        </div>
      )}
    </DialogContent>
  );
}
