import { cn } from "@/lib/utils";
import { profile } from "@/lib/data";

/**
 * Two-tone initials monogram on a premium dark tile — the same mark used as the
 * site favicon (`src/app/icon.svg`), rendered inline as SVG so it stays crisp
 * at any size and matches the browser tab exactly. First initial reads in
 * near-white, the rest in gray. Uses a system sans (not the page font) so it
 * mirrors the favicon regardless of theme.
 */
export function Monogram({ className }: { className?: string }) {
  const [first, ...rest] = profile.initials;
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={`${profile.name} monogram`}
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="monogram-tile" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2c2c2c" />
          <stop offset="1" stopColor="#0b0b0b" />
        </linearGradient>
        <linearGradient id="monogram-sheen" x1="0" y1="0" x2="52" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#monogram-tile)" />
      <rect width="64" height="64" rx="15" fill="url(#monogram-sheen)" />
      <rect x="0.6" y="0.6" width="62.8" height="62.8" rx="14.4" fill="none" stroke="#ffffff" strokeOpacity="0.13" />
      <text
        x="32.5"
        y="43.5"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        fontSize="30"
        fontWeight="800"
        textAnchor="middle"
        letterSpacing="-2.5"
      >
        <tspan fill="#fafafa">{first}</tspan>
        <tspan fill="#9a9a9a">{rest.join("")}</tspan>
      </text>
    </svg>
  );
}
