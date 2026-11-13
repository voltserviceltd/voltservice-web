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
          className="sticker flex w-full items-start gap-4 rounded-3xl border-2 border-line bg-surface p-4 text-left shadow-hard-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue"
        >
          <span className="relative size-18 shrink-0 -rotate-3 overflow-hidden rounded-[1rem] border-2 border-ink bg-pink">
            {founderContent.avatar ? (
              <Image
                src={founderContent.avatar.src}
                alt={founderContent.avatar.alt}
                fill
                sizes="72px"
                className="object-cover"
              />
            ) : (
              <span className="flex size-full items-center justify-center text-sm font-semibold text-accent-primary">
                {founderContent.initials}
              </span>
            )}
          </span>

          <span className="flex min-w-0 flex-col gap-1">
            <span className="font-display text-lg font-extrabold text-text-primary">{founderContent.name}</span>
            <span className="text-sm text-text-muted">{founderContent.role}</span>
            <span className="text-sm text-text-muted">{founderContent.supportingLine}</span>
            <span className="mt-1 w-fit bg-[linear-gradient(var(--color-volt),var(--color-volt))] bg-[length:100%_4px] bg-bottom bg-no-repeat pb-0.5 text-sm font-semibold text-text-primary">
              {founderContent.actionText}
            </span>
          </span>
        </button>
      </DialogTrigger>

      <FounderDetailsDialog />
    </Dialog>
  );
}
