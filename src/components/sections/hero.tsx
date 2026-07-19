import { MapPin, Mail } from "lucide-react";

import { profile } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/section-heading";
import { SocialLinks } from "@/components/social-links";
import { Monogram } from "@/components/monogram";

function InfoItem({
  label,
  children,
  icon,
}: {
  label: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Eyebrow>{label}</Eyebrow>
      <div className="flex items-center gap-2 text-sm">
        <span className="grid size-4 shrink-0 place-items-center text-muted-foreground">
          {icon}
        </span>
        <span className="min-w-0 wrap-break-word">{children}</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="scroll-mt-24">
      <div className="mx-auto max-w-3xl px-6 pb-14 pt-8 sm:pt-14">
        {/* Identity */}
        <Reveal>
          <div className="flex items-center gap-4">
            <Monogram className="size-14" />
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight sm:text-[1.75rem]">
                {profile.name}
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">{profile.role}</p>
            </div>
          </div>
        </Reveal>

        {/* Facts */}
        <Reveal
          delay={0.05}
          className="mt-9 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3"
        >
          <InfoItem label="Location" icon={<MapPin className="size-[0.9rem]" />}>
            {profile.location}
          </InfoItem>
          <InfoItem label="Email" icon={<Mail className="size-[0.9rem]" />}>
            <a
              href={`mailto:${profile.email}`}
              className="transition-colors hover:text-foreground"
            >
              {profile.email}
            </a>
          </InfoItem>
          <InfoItem
            label="Availability"
            icon={<span className="size-2 rounded-full bg-positive" />}
          >
            {profile.availableLabel}
          </InfoItem>
        </Reveal>

        {/* Bio */}
        <Reveal delay={0.1}>
          <p className="mt-9 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
            {profile.bio.map((seg, i) =>
              seg.strong ? (
                <strong key={i} className="font-medium text-highlight">
                  {seg.text}
                </strong>
              ) : (
                <span key={i}>{seg.text}</span>
              ),
            )}
          </p>
        </Reveal>

        {/* Socials */}
        <Reveal delay={0.16}>
          <SocialLinks className="mt-7" />
        </Reveal>
      </div>
    </section>
  );
}
