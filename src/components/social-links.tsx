import { Mail } from "lucide-react";

import { socials } from "@/lib/data";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Tooltip } from "@/components/tooltip";

const links = [
  { label: "GitHub", href: socials.github, icon: GithubIcon, external: true },
  { label: "LinkedIn", href: socials.linkedin, icon: LinkedinIcon, external: true },
  { label: "Email", href: socials.email, icon: Mail, external: false },
];

/** Bare icon row — no chrome, muted → foreground on hover. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {links.map(({ label, href, icon: Icon, external }) => (
        <Tooltip key={label} content={label}>
          <a
            href={href}
            aria-label={label}
            {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
            className="-m-1 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Icon className="size-[1.15rem]" />
          </a>
        </Tooltip>
      ))}
    </div>
  );
}
