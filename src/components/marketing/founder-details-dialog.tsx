import Link from "next/link";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { founderContent, isValidFounderLink } from "@/lib/content/service/founder-content";

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
        <div className="flex flex-wrap gap-4 border-t border-border-subtle pt-4">
          {validLinks.map((link) =>
            link.href.startsWith("https://") ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent-primary hover:underline"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-accent-primary hover:underline"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
      )}
    </DialogContent>
  );
}
