import { achievements, experiences } from "@/lib/data";
import { brandKeyFor, BrandIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { Eyebrow, SectionHeading } from "@/components/section-heading";
import { Tooltip } from "@/components/tooltip";

function Dot({ current }: { current?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute left-0 top-1.5 size-2.5 rounded-full ring-4 ring-background",
        current ? "bg-positive" : "bg-border-strong",
      )}
    />
  );
}

function TechRow({ tech }: { tech: string[] }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-3.5 gap-y-2">
      {tech.map((t) => {
        const key = brandKeyFor(t);
        return key ? (
          <Tooltip key={t} content={t}>
            <span aria-label={t} className="size-[1.15rem]">
              <BrandIcon name={key} title={t} />
            </span>
          </Tooltip>
        ) : null;
      })}
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <SectionHeading label="Experience" />

        <ol className="relative mt-10">
          {/* connector */}
          <span
            aria-hidden
            className="absolute bottom-2 left-1.25 top-2 w-px bg-border"
          />

          {experiences.map((job) => (
            <li key={job.company} className="relative pl-8">
              <Reveal>
                <Dot current={job.current} />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-semibold tracking-tight">
                    {job.role}
                    <span className="font-normal text-muted-foreground"> · {job.company}</span>
                  </h3>
                  <span className="shrink-0 text-sm text-muted-foreground">{job.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {[job.location, job.type].filter(Boolean).join(", ")}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {job.summary}
                </p>

                <ul className="mt-4 space-y-3">
                  {job.highlights.map((item) => (
                    <li key={item.title} className="flex gap-2.5 text-sm">
                      <span
                        aria-hidden
                        className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground"
                      />
                      <p className="leading-relaxed text-muted-foreground">
                        <span className="text-foreground">{item.title}.</span>{" "}
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>

                <TechRow tech={job.tech} />
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Recognition */}
        <Reveal className="mt-12 border-t border-border pt-8">
          <Eyebrow as="h3">Recognition</Eyebrow>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2">
            {achievements.map((item) => (
              <li key={item.title}>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                <Eyebrow className="mt-2 inline-block">{item.meta}</Eyebrow>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
