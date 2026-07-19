import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  bordered?: boolean;
  children: React.ReactNode;
};

/** Narrow, editorial container with a light divider between sections. */
export function Section({ id, className, bordered = false, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-16 sm:py-20",
        bordered && "border-t border-border",
        className,
      )}
    >
      <div className="mx-auto max-w-3xl px-6">{children}</div>
    </section>
  );
}
