"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny preference store (theme + sound) shared by the sidebar, ⌘K menu and buttons.
 * Sound is OFF by default; visitors opt in.
 */
type Theme = "light" | "dark";
type State = { theme: Theme; sound: boolean };

const listeners = new Set<() => void>();
let state: State = { theme: "light", sound: false };
let ready = false;

function init() {
  if (ready || typeof window === "undefined") return;
  ready = true;
  const t = document.documentElement.getAttribute("data-theme");
  state = { theme: t === "dark" ? "dark" : "light", sound: localStorage.getItem("sm-sound") === "1" };
}

function emit() {
  listeners.forEach((l) => l());
}

export const prefs = {
  get: () => (init(), state),
  setTheme(theme: Theme) {
    init();
    state = { ...state, theme };
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("sm-theme", theme); } catch {}
    emit();
  },
  toggleTheme() {
    prefs.setTheme(prefs.get().theme === "dark" ? "light" : "dark");
  },
  toggleSound() {
    init();
    state = { ...state, sound: !state.sound };
    try { localStorage.setItem("sm-sound", state.sound ? "1" : "0"); } catch {}
    emit();
    if (state.sound) play("on");
  },
};

const server: State = { theme: "light", sound: false };
export function usePrefs(): State {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    prefs.get,
    () => server
  );
}

/* ── Sound: synthesised with Web Audio, no files to download ─────────── */
let ctx: AudioContext | null = null;
type Kind = "tick" | "pop" | "success" | "on" | "drag";

export function play(kind: Kind) {
  if (typeof window === "undefined") return;
  if (!state.sound && kind !== "on") return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches && kind === "drag") return;
  try {
    ctx ??= new AudioContext();
    const now = ctx.currentTime;
    const notes: Record<Kind, [number, number, number][]> = {
      // [frequency, start offset, duration]
      tick: [[1800, 0, 0.03]],
      drag: [[900, 0, 0.015]],
      pop: [[520, 0, 0.06], [780, 0.04, 0.08]],
      on: [[660, 0, 0.07], [990, 0.06, 0.1]],
      success: [[523, 0, 0.09], [659, 0.07, 0.09], [784, 0.14, 0.16]],
    };
    for (const [f, at, dur] of notes[kind]) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = kind === "tick" || kind === "drag" ? "square" : "sine";
      o.frequency.value = f;
      const vol = kind === "tick" || kind === "drag" ? 0.025 : 0.06;
      g.gain.setValueAtTime(0, now + at);
      g.gain.linearRampToValueAtTime(vol, now + at + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, now + at + dur);
      o.connect(g).connect(ctx.destination);
      o.start(now + at);
      o.stop(now + at + dur + 0.02);
    }
  } catch {}
}

/**
 * A short two-note glide from one pitch to another (used by the 3D stack: moving down the stack
 * slides the pitch down, moving back up slides it up). Silent unless the visitor turned sound on.
 */
export function playGlide(from: number, to: number, type: OscillatorType = "sine") {
  if (typeof window === "undefined" || !state.sound) return;
  try {
    ctx ??= new AudioContext();
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(from, now);
    o.frequency.exponentialRampToValueAtTime(to, now + 0.12);
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.055, now + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
    o.connect(g).connect(ctx.destination);
    o.start(now);
    o.stop(now + 0.35);
  } catch {}
}
