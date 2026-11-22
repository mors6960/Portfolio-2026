"use client";

import { useEffect, useState } from "react";
import { Command, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { prefs, usePrefs, play } from "@/lib/prefs";

const openCommandMenu = () => window.dispatchEvent(new Event("sm:cmdk"));

/** Section nav with scroll spy (Brittany Chiang-style growing line) plus theme, sound and ⌘K. */
export function SideNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Sections" className="hidden lg:block">
      <ul className="mt-14 grid gap-1 short:mt-7 tiny:mt-4">
        {sections.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "true" : undefined}
                onClick={() => play("tick")}
                className="group flex items-center gap-4 py-2.5 text-[12px] short:py-1.5 tiny:py-1 font-semibold tracking-[0.14em] uppercase"
              >
                <span
                  aria-hidden
                  className={`h-px transition-all duration-300 ${on ? "w-16 bg-ink" : "w-8 bg-line-strong group-hover:w-16 group-hover:bg-ink"}`}
                />
                <span className={on ? "text-ink" : "text-muted group-hover:text-ink"}>{s.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Controls() {
  const { theme, sound } = usePrefs();
  const btn =
    "grid size-11 place-items-center rounded-full border border-line text-body transition-colors hover:border-line-strong hover:text-ink";
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => (prefs.toggleTheme(), play("tick"))} className={btn} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
        {theme === "dark" ? <Sun aria-hidden className="size-[18px]" /> : <Moon aria-hidden className="size-[18px]" />}
      </button>
      <button type="button" onClick={prefs.toggleSound} className={btn} aria-pressed={sound} aria-label="Sound effects">
        {sound ? <Volume2 aria-hidden className="size-[18px]" /> : <VolumeX aria-hidden className="size-[18px]" />}
      </button>
      <button
        type="button"
        onClick={() => (openCommandMenu(), play("tick"))}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-[13px] text-body transition-colors hover:border-line-strong hover:text-ink"
      >
        <Command aria-hidden className="size-4" />
        <span>Menu</span>
        <kbd className="hidden rounded-md pointer-fine:inline border border-line bg-surface-2 px-1.5 font-mono text-[11px] text-muted">⌘K</kbd>
      </button>
    </div>
  );
}
