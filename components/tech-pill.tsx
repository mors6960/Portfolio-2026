import { brandColor, techIcon } from "@/lib/tech-icons";
import { T } from "./t";

/** A technology chip with its logo; the logo takes its brand colour on hover. */
export function TechPill({ label, className = "" }: { label: string; className?: string }) {
  const icon = techIcon(label);
  return (
    <span
      className={`group/pill inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/60 px-2.5 py-0.5 font-mono text-[12px] text-body ${className}`}
      style={icon ? ({ "--brand": brandColor(icon.hex) } as React.CSSProperties) : undefined}
    >
      {icon ? (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-3.5 shrink-0 fill-current text-muted transition-colors duration-200 group-hover/pill:text-[var(--brand)] group-hover:text-[var(--brand)]"
        >
          <path d={icon.path} />
        </svg>
      ) : null}
      <T>{label}</T>
    </span>
  );
}
