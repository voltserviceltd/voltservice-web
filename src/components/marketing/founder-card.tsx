"use client";

import Image from "next/image";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FounderDetailsDialog } from "@/components/marketing/founder-details-dialog";
import { founderContent } from "@/lib/content/service/founder-content";

export function FounderCard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex w-full items-start gap-3 rounded-lg border border-border-subtle bg-surface p-4 text-left transition-colors hover:border-accent-secondary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent-primary/40"
        >
          <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-background-subtle">
            {founderContent.avatar ? (
              <Image
                src={founderContent.avatar.src}
                alt={founderContent.avatar.alt}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <span className="flex size-full items-center justify-center text-sm font-semibold text-accent-primary">
                {founderContent.initials}
              </span>
            )}
          </span>

          <span className="flex min-w-0 flex-col gap-1">
            <span className="font-semibold text-text-primary">{founderContent.name}</span>
            <span className="text-sm text-text-muted">{founderContent.role}</span>
            <span className="text-sm text-text-muted">{founderContent.supportingLine}</span>
            <span className="mt-1 text-sm font-medium text-accent-primary">
              {founderContent.actionText}
            </span>
          </span>
        </button>
      </DialogTrigger>

      <FounderDetailsDialog />
    </Dialog>
  );
}
