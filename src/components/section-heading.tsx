import { cn } from "@/lib/utils";

/** Tiny uppercase mono eyebrow — the one section-labeling device site-wide. */
export function Eyebrow({
  children,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h2" | "h3" | "p";
}) {
  return <Tag className={cn("eyebrow", className)}>{children}</Tag>;
}

/** Section header: an eyebrow label with an optional lead line beneath. */
export function SectionHeading({
  label,
  description,
  className,
}: {
  label: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Eyebrow as="h2">{label}</Eyebrow>
      {description ? (
        <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
