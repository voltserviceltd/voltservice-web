type PageSectionProps = {
  children: React.ReactNode;
  subtle?: boolean;
};

/** Consistent max-width/padding wrapper, with an optional dust-grey band for section rhythm. */
export function PageSection({ children, subtle }: PageSectionProps) {
  return (
    <section className={subtle ? "bg-background-subtle" : undefined}>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">{children}</div>
    </section>
  );
}
