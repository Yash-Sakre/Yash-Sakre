import { techStack } from "@/lib/data";
import { BRAND_ICONS, BrandIcon, type BrandKey } from "@/components/brand-icons";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/section-heading";
import { Tooltip } from "@/components/tooltip";

export function TechStack() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-4 pt-2">
      <Reveal>
        <Eyebrow as="h2">Tech Stack</Eyebrow>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-5">
          {techStack.map((key) => {
            const label = BRAND_ICONS[key as BrandKey].label;
            return (
              <Tooltip key={key} content={label}>
                <span
                  aria-label={label}
                  className="size-8 opacity-90 transition-opacity hover:opacity-100"
                >
                  <BrandIcon name={key as BrandKey} title={label} />
                </span>
              </Tooltip>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
