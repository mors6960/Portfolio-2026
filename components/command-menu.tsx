"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight, Briefcase, Code2, Copy, FileText, Hash, Moon, Sun, Volume2, VolumeX,
} from "lucide-react";
import { prefs, usePrefs, play } from "@/lib/prefs";
import { copyEmail } from "./copy-email";
import { GithubIcon, LinkedinIcon } from "./icons";

export type MenuData = {
  sections: { id: string; label: string }[];
  projects: { slug: string; title: string }[];
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
};


/** ⌘K / Ctrl+K palette (Paco Coursey's cmdk): navigate, open case studies, copy email, switch theme or sound. */
export function CommandMenu({ data, initialOpen = false }: { data: MenuData; initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const { theme, sound } = usePrefs();
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
        play("tick");
      }
    };
    const onOpen = () => setOpen(true);
    addEventListener("keydown", onKey);
    addEventListener("sm:cmdk", onOpen);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("sm:cmdk", onOpen);
    };
  }, []);

  const run = (fn: () => void) => () => {
    setOpen(false);
    play("tick");
    fn();
  };
  const go = (id: string) => {
    if (location.pathname !== "/") router.push(`/#${id}`);
    else document.getElementById(id)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      className="overflow-hidden rounded-[18px] border border-line bg-surface text-ink shadow-float"
    >
      <Command.Input
        placeholder="Type a command or search…"
        className="h-14 w-full border-b border-line bg-transparent px-4 text-[16px] text-ink placeholder:text-muted focus:outline-none"
      />
      <Command.List className="p-2">
        <Command.Empty>Nothing found.</Command.Empty>
        <Command.Group heading="Go to">
          {data.sections.map((s) => (
            <Command.Item key={s.id} value={`go ${s.label}`} onSelect={run(() => go(s.id))}>
              <Hash aria-hidden className="size-4 text-muted" /> {s.label}
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Case studies">
          {data.projects.map((p) => (
            <Command.Item key={p.slug} value={`case study ${p.title}`} onSelect={run(() => router.push(`/work/${p.slug}`))}>
              <Briefcase aria-hidden className="size-4 text-muted" /> {p.title}
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Actions">
          <Command.Item value="copy email address" onSelect={run(() => copyEmail(data.email, { x: innerWidth / 2, y: innerHeight * 0.3 }))}>
            <Copy aria-hidden className="size-4 text-muted" /> Copy email address
          </Command.Item>
          {data.resumeUrl ? (
            <Command.Item value="resume cv download" onSelect={run(() => window.open(data.resumeUrl, "_blank"))}>
              <FileText aria-hidden className="size-4 text-muted" /> Open résumé
            </Command.Item>
          ) : null}
          <Command.Item value="theme dark light toggle" onSelect={run(prefs.toggleTheme)}>
            {theme === "dark" ? <Sun aria-hidden className="size-4 text-muted" /> : <Moon aria-hidden className="size-4 text-muted" />}
            Switch to {theme === "dark" ? "light" : "dark"} theme
          </Command.Item>
          <Command.Item value="sound effects toggle mute" onSelect={run(prefs.toggleSound)}>
            {sound ? <VolumeX aria-hidden className="size-4 text-muted" /> : <Volume2 aria-hidden className="size-4 text-muted" />}
            Turn sound {sound ? "off" : "on"}
          </Command.Item>
          <Command.Item value="view source code of this site" onSelect={run(() => go("hero"))}>
            <Code2 aria-hidden className="size-4 text-muted" /> X-ray the demo
          </Command.Item>
        </Command.Group>
        <Command.Group heading="Elsewhere">
          <Command.Item value="github profile" onSelect={run(() => window.open(data.github, "_blank"))}>
            <GithubIcon className="size-4 text-muted" /> GitHub <ArrowUpRight aria-hidden className="ml-auto size-4 text-muted" />
          </Command.Item>
          <Command.Item value="linkedin profile" onSelect={run(() => window.open(data.linkedin, "_blank"))}>
            <LinkedinIcon className="size-4 text-muted" /> LinkedIn <ArrowUpRight aria-hidden className="ml-auto size-4 text-muted" />
          </Command.Item>
        </Command.Group>
      </Command.List>
      <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[12px] text-muted">
        <span>↑↓ to move · ↵ to select</span>
        <span>esc to close</span>
      </div>
    </Command.Dialog>
  );
}
