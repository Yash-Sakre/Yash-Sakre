import { ArrowUpRight, Mail } from "lucide-react";

import { availability, profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SocialLinks } from "@/components/social-links";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <SectionHeading label="Let's Work Together" />

        <Reveal className="mt-6 max-w-xl">
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
            I&apos;m open to frontend roles and freelance projects. The fastest
            way to reach me is email — I read everything and reply within a day.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className={cn(buttonVariants({ size: "lg" }), "group mt-7")}
          >
            <Mail />
            {profile.email}
            <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-positive" aria-hidden />
              {availability.openTo}
            </span>
            <span aria-hidden className="text-border-strong">
              ·
            </span>
            <span>Based in {profile.location}</span>
          </div>

          <SocialLinks className="mt-7" />
        </Reveal>
      </div>
    </section>
  );
}
