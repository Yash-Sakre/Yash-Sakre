import { profile } from "@/lib/data";
import { SocialLinks } from "@/components/social-links";

const footerLinks = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="flex flex-col gap-5 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}.
          </p>

          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
