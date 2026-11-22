"use client";

import { useEffect, useRef, useState } from "react";
import {
  siCapacitor, siEthereum, siMongodb, siNestjs, siNextdotjs, siNodedotjs, siPostgresql, siReact,
  siSocketdotio, siSolana, siSolidity, siStripe, siSupabase, siJsonwebtokens,
} from "simple-icons";
import { brandColor } from "@/lib/tech-icons";
import { playGlide } from "@/lib/prefs";

/**
 * "How a request moves through my stack": an isometric, exploded 3D stack drawn with CSS 3D
 * transforms only (no WebGL). Scrolling pulls the layers apart and walks through them one by one;
 * the pointer tilts the scene. Reduced motion shows the fully opened stack, still.
 */

type Layer = { name: string; sub: string; note: string; color: string; icons: { path: string; hex: string; title: string }[] };

/** One pitch per layer, high at the screen and low at the chain (A major pentatonic, A5 → A4). */
const PITCH = [880, 740, 659, 554, 440];

const layers: Layer[] = [
  { name: "Clients", sub: "React · Next.js · Capacitor", note: "Web and mobile apps from one TypeScript codebase.", color: "#38bdf8", icons: [siReact, siNextdotjs, siCapacitor] },
  { name: "API", sub: "NestJS · Node.js · JWT · RBAC", note: "Versioned REST APIs with auth and role checks on every route.", color: "#ff7a45", icons: [siNestjs, siNodedotjs, siJsonwebtokens] },
  { name: "Realtime & webhooks", sub: "Socket.IO · Stripe · RevenueCat", note: "Live events under 100 ms, and idempotent webhooks that survive retries.", color: "#a78bfa", icons: [siSocketdotio, siStripe] },
  { name: "Data", sub: "PostgreSQL · MongoDB · Supabase", note: "Schemas, row-level security, triggers and the queries that make it fast.", color: "#22c55e", icons: [siPostgresql, siMongodb, siSupabase] },
  { name: "Chain", sub: "Ethereum · Solidity · multi-chain", note: "Contracts, wallets and event listeners kept in step with the database.", color: "#f59e0b", icons: [siEthereum, siSolidity, siSolana] },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export function StackScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);
  const prev = useRef<number | null>(null);

  // Each move between layers glides from the old layer's pitch to the new one:
  // Data → Chain slides down, Chain → Data slides back up. Silent until the visitor turns sound on.
  useEffect(() => {
    const from = prev.current;
    prev.current = active;
    if (from === null || from === active) return;
    playGlide(PITCH[from], PITCH[active], active === layers.length - 1 ? "triangle" : "sine");
  }, [active]);

  useEffect(() => {
    const el = wrap.current, sc = scene.current;
    if (!el || !sc) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStill(true);
      sc.style.setProperty("--open", "1");
      return;
    }
    // Scroll sets a target; the scene eases toward it every frame, so wheel "clicks" and
    // trackpad flicks turn into one continuous motion instead of jumps.
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0, target = 0, cur = 0;
    const readScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = innerHeight;
      target = clamp((vh * 0.25 - r.top) / (r.height - vh * 0.75));
    };
    const update = () => {
      raf = 0;
      cur += (target - cur) * 0.09;
      if (Math.abs(target - cur) < 0.0005) cur = target;
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      const open = clamp(cur * 2.2);
      // smoothstep so the stack eases open and eases into its final spacing
      sc.style.setProperty("--open", (open * open * (3 - 2 * open)).toFixed(4));
      sc.style.setProperty("--tx", cx.toFixed(3));
      sc.style.setProperty("--ty", cy.toFixed(3));
      setActive(Math.min(layers.length - 1, Math.floor(clamp((cur - 0.18) / 0.8) * layers.length)));
      if (cur !== target || Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002) raf = requestAnimationFrame(update);
    };
    const kick = () => {
      readScroll();
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = sc.getBoundingClientRect();
      tx = clamp((e.clientX - r.left) / r.width, 0, 1) - 0.5;
      ty = clamp((e.clientY - r.top) / r.height, 0, 1) - 0.5;
      kick();
    };
    const onLeave = () => {
      tx = ty = 0;
      kick();
    };
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", kick);
    sc.addEventListener("pointermove", onMove);
    sc.addEventListener("pointerleave", onLeave);
    kick();
    return () => {
      removeEventListener("scroll", kick);
      removeEventListener("resize", kick);
      sc.removeEventListener("pointermove", onMove);
      sc.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrap} className={still ? "" : "h-[210vh] lg:h-[230vh]"}>
      <div className={still ? "" : "sticky top-[8vh] lg:top-[12vh]"}>
        <div className="grid items-center gap-6 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          {/* 3D stack */}
          <div
            ref={scene}
            aria-hidden
            className="stack-scene relative mx-auto h-[330px] w-full max-w-[340px] sm:h-[420px]"
            style={{ ["--open" as string]: 0, ["--tx" as string]: 0, ["--ty" as string]: 0 }}
          >
            <div className="stack-plane absolute top-1/2 left-1/2">
              {layers.map((l, i) => {
                const depth = layers.length - 1 - i; // Clients on top
                const on = i === active;
                return (
                  <div
                    key={l.name}
                    className={`stack-layer ${on ? "is-active" : ""}`}
                    style={{ ["--z" as string]: depth, ["--c" as string]: l.color }}
                  >
                    <div className="stack-edge" />
                    <div className="stack-face">
                      <p className="stack-name">{l.name}</p>
                      <div className="flex gap-1.5">
                        {l.icons.map((ic) => (
                          <span key={ic.title} className="stack-tile">
                            <svg viewBox="0 0 24 24" className="size-[42%]" style={{ fill: brandColor(ic.hex) === "currentColor" ? "var(--ink)" : `#${ic.hex}` }}>
                              <path d={ic.path} />
                            </svg>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="stack-beam" />
            </div>
          </div>

          {/* Captions */}
          <ol className="grid gap-1.5">
            {layers.map((l, i) => {
              const on = still || i === active;
              return (
                <li
                  key={l.name}
                  className={`rounded-[14px] border px-4 py-3 transition-[background-color,border-color,box-shadow,color] duration-500 ease-out ${
                    on ? "border-line-strong bg-surface text-ink shadow-float" : "border-transparent text-muted"
                  } ${!still && i !== active ? "max-sm:hidden" : ""}`}
                >
                  <p className="flex items-center gap-2 text-[14.5px] font-semibold">
                    <span className={`size-2 rounded-full transition-opacity duration-500 ${on ? "" : "opacity-50"}`} style={{ background: l.color }} aria-hidden />
                    {l.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[11.5px] text-muted">{l.sub}</p>
                  <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <p className="overflow-hidden pt-1.5 text-[13.5px] leading-5 text-body">{l.note}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
