"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { burst } from "@/lib/confetti";
import { play } from "@/lib/prefs";

export async function copyEmail(email: string, from?: { x: number; y: number }) {
  try {
    await navigator.clipboard.writeText(email);
  } catch {
    return false;
  }
  play("success");
  if (from) burst(from.x, from.y);
  return true;
}

export function CopyEmail({ email, className = "" }: { email: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        if (await copyEmail(email, { x: r.left + r.width / 2, y: r.top + r.height / 2 })) {
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        }
      }}
      className={className}
    >
      {done ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
      <span>{done ? "Copied" : "Copy email"}</span>
      <span className="sr-only" aria-live="polite">{done ? "Email address copied" : ""}</span>
    </button>
  );
}
