"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Check, Plus, ScanLine, X } from "lucide-react";
import { play } from "@/lib/prefs";

/**
 * The signature moment: one small working app, rendered twice on top of itself.
 * The top layer is the interface; underneath, row for row, is the backend that serves it
 * (route, validation, MongoDB documents). Move the pointer over the app and an x-ray lens
 * shows the layer below. On touch, or from the keyboard, the "Backend" switch wipes it in fully.
 * Every click is handled by a simulated API, so the request log and documents update for real.
 */

type Task = { id: string; title: string; done: boolean };
type Method = "GET" | "POST" | "PATCH" | "DELETE";
type Req = { n: number; method: Method; path: string; status: number; note?: string };

const MAX = 4;
const hex = () => Math.random().toString(16).slice(2, 6);

const seed: Task[] = [
  { id: "a1f3", title: "Design the tenancy schema", done: true },
  { id: "7c2e", title: "Ship the ⌘K command menu", done: false },
  { id: "e90b", title: "Write the case study", done: false },
];

// Row heights shared by both layers so each UI row sits exactly over its backend row
const H = { head: 56, form: 64, row: 52, foot: 44 };

export function XrayDemo() {
  const [tasks, setTasks] = useState<Task[]>(seed);
  const [log, setLog] = useState<Req[]>([{ n: 1, method: "GET", path: "/api/tasks", status: 200 }]);
  const [draft, setDraft] = useState("");
  const [backend, setBackend] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  // Lens position lives outside React state: it changes every frame and must not re-render the app
  const lens = useRef({ x: 0, y: 0, r: 0 });
  const backendRef = useRef(false);

  function paint(next: Partial<{ x: number; y: number; r: number }>, mode: "follow" | "ease" = "follow") {
    Object.assign(lens.current, next);
    const { x, y, r } = lens.current;
    const code = codeRef.current, ring = ringRef.current;
    if (!code || !ring) return;
    const full = backendRef.current;
    code.style.transition = full || mode === "ease" ? "clip-path 520ms cubic-bezier(.7,0,.2,1)" : "none";
    code.style.clipPath = `circle(${full ? "150%" : `${r}px`} at ${x}px ${y}px)`;
    ring.style.transition = mode === "ease" ? "all 520ms cubic-bezier(.7,0,.2,1)" : "opacity 200ms";
    ring.style.transform = `translate(${x - r}px, ${y - r}px)`;
    ring.style.width = ring.style.height = `${r * 2}px`;
    ring.style.opacity = !full && r > 4 ? "1" : "0";
  }
  const seq = useRef(1);
  const inputId = useId();

  const open = tasks.filter((t) => !t.done).length;
  const last = log[log.length - 1];

  function request(method: Method, path: string, status: number, note?: string) {
    seq.current += 1;
    setLog((l) => [...l.slice(-3), { n: seq.current, method, path, status, note }]);
    play(status >= 400 ? "tick" : "pop");
  }

  function add(e: React.FormEvent) {
    e.preventDefault();
    const title = draft.trim();
    if (!title) return request("POST", "/api/tasks", 422, "title is required");
    if (title.length > 48) return request("POST", "/api/tasks", 422, "title too long (max 48)");
    if (tasks.length >= MAX) return request("POST", "/api/tasks", 409, `demo holds ${MAX} tasks; delete one`);
    const t = { id: hex(), title, done: false };
    setTasks((ts) => [...ts, t]);
    setDraft("");
    setFlash(t.id);
    request("POST", "/api/tasks", 201);
  }

  function toggle(t: Task) {
    setTasks((ts) => ts.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)));
    setFlash(t.id);
    request("PATCH", `/api/tasks/${t.id}`, 200);
  }

  function remove(t: Task) {
    setTasks((ts) => ts.filter((x) => x.id !== t.id));
    request("DELETE", `/api/tasks/${t.id}`, 204);
  }

  useEffect(() => {
    if (!flash) return;
    const id = setTimeout(() => setFlash(null), 900);
    return () => clearTimeout(id);
  }, [flash]);

  // A one-time sweep of the lens so first-time visitors see what the card does
  useEffect(() => {
    const el = bodyRef.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let start = 0;
    const timer = setTimeout(() => {
      const w = el.clientWidth;
      const tick = (t: number) => {
        start ||= t;
        const p = Math.min((t - start) / 1600, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const r = p < 0.85 ? 96 : 96 * (1 - (p - 0.85) / 0.15);
        paint({ x: w * (0.12 + ease * 0.7), y: H.head + H.form + H.row * 1.5, r });
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, 900);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const r = bodyRef.current!.getBoundingClientRect();
    paint({ x: e.clientX - r.left, y: e.clientY - r.top, r: 104 });
  }

  const rowsHeight = H.row * MAX;

  return (
    <figure className="relative">
      <div className="overflow-hidden rounded-[22px] border border-line bg-surface shadow-float">
        {/* Card chrome */}
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
          </div>
          <p className="truncate font-mono text-[12px] text-muted">
            {backend ? "server · routes/tasks.js + mongodb" : `${(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/^https?:\/\//, "").replace(/\/$/, "")}/ship-log`}
          </p>
          <button
            type="button"
            aria-pressed={backend}
            onClick={() => {
              const el = bodyRef.current!;
              backendRef.current = !backend;
              paint({ x: lens.current.x || el.clientWidth / 2, y: lens.current.y || el.clientHeight / 2 }, "ease");
              setBackend(!backend);
              play("tick");
            }}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line-strong px-3 text-[12.5px] font-medium text-ink transition-colors hover:bg-surface-2"
          >
            <ScanLine aria-hidden className="size-3.5" />
            {backend ? "Frontend" : "Backend"}
          </button>
        </div>

        {/* Both layers share this box */}
        <div
          ref={bodyRef}
          onPointerMove={onMove}
          onPointerLeave={() => !backend && paint({ r: 0 }, "ease")}
          className="relative"
          style={{ height: H.head + H.form + rowsHeight + H.foot }}
        >
          {/* ── Frontend layer ─────────────────────────────── */}
          <div className="absolute inset-0 flex flex-col" inert={backend} aria-hidden={backend}>
            <Row h={H.head} className="justify-between">
              <p className="text-[17px] font-semibold tracking-tight text-ink">Ship log</p>
              <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[12.5px] font-medium text-accent tabular">
                {open} open
              </span>
            </Row>
            <Row h={H.form}>
              <form onSubmit={add} className="flex w-full gap-2" noValidate>
                <label htmlFor={inputId} className="sr-only">
                  New task
                </label>
                <input
                  id={inputId}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Add a task, then watch the backend…"
                  autoComplete="off"
                  className="h-10 min-w-0 flex-1 rounded-[10px] border border-line-strong bg-bg px-3 text-[14.5px] text-ink placeholder:text-muted focus:border-accent-bright focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center gap-1 rounded-[10px] bg-ink px-3.5 text-[14px] font-semibold text-bg transition-transform active:translate-y-px"
                >
                  <Plus aria-hidden className="size-4" /> Add
                </button>
              </form>
            </Row>
            <ul style={{ height: rowsHeight }} aria-label="Tasks">
              {tasks.map((t) => (
                <li key={t.id}>
                  <Row h={H.row} className={flash === t.id ? "bg-accent-soft/60" : ""}>
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={t.done}
                      aria-label={`Mark "${t.title}" as ${t.done ? "not done" : "done"}`}
                      onClick={() => toggle(t)}
                      className={`grid size-[22px] shrink-0 place-items-center rounded-[7px] border transition-colors ${
                        t.done ? "border-ok bg-ok text-bg" : "border-line-strong hover:border-ink"
                      }`}
                    >
                      {t.done ? <Check aria-hidden className="size-3.5" strokeWidth={3} /> : null}
                    </button>
                    <span className={`min-w-0 flex-1 truncate text-[15px] ${t.done ? "text-muted line-through" : "text-ink"}`}>
                      {t.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(t)}
                      aria-label={`Delete "${t.title}"`}
                      className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                    >
                      <X aria-hidden className="size-4" />
                    </button>
                  </Row>
                </li>
              ))}
            </ul>
            <Row h={H.foot} className="mt-auto justify-between border-t border-line text-[12.5px] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-ok" aria-hidden /> Synced
              </span>
              <span className="tabular">{tasks.length} of {MAX}</span>
            </Row>
          </div>

          {/* ── Backend layer (same rows, the code that serves them) ─── */}
          <div
            ref={codeRef}
            aria-hidden={!backend}
            className="code-skin pointer-events-none absolute inset-0 flex flex-col font-mono text-[12.5px] leading-5"
            style={{
              background:
                "linear-gradient(var(--c-grid) 1px, transparent 1px) 0 0 / 100% 26px, radial-gradient(120% 90% at 50% 0%, #10223d, var(--c-bg))",
              color: "var(--c-text)",
              clipPath: "circle(0px at 0px 0px)",
            }}
          >
            <CodeRow h={H.head} active={last.method === "GET"}>
              <K>GET</K> <S>/api/tasks</S> <D>→</D> <N>200</N>{" "}
              <D>
                {"// "}
                {open} open
              </D>
            </CodeRow>
            <CodeRow h={H.form} active={last.method === "POST"}>
              <span className="block">
                router.<F>post</F>(<S>&quot;/tasks&quot;</S>, <F>validate</F>(TaskSchema), <K>async</K> (req, res) =&gt;
              </span>
              <span className="block pl-3">
                res.<F>status</F>(<N>201</N>).<F>json</F>(<K>await</K> Task.<F>create</F>(req.body))
              </span>
            </CodeRow>
            <div style={{ height: rowsHeight }}>
              {tasks.map((t) => (
                <CodeRow key={t.id} h={H.row} active={flash === t.id}>
                  <D>{"{ "}</D>
                  <Kk>_id</Kk>: <S>&quot;{t.id}&quot;</S>, <Kk>title</Kk>: <S className="inline-block max-w-[46%] truncate align-bottom">&quot;{t.title}&quot;</S>,{" "}
                  <Kk>done</Kk>: <N>{String(t.done)}</N>
                  <D>{" }"}</D>
                </CodeRow>
              ))}
            </div>
            <CodeRow h={H.foot} className="mt-auto border-t" active={false}>
              <D>db.tasks.</D>
              <F>countDocuments</F>
              <D>()</D> <D>{"// "}</D>
              <N>{tasks.length}</N>
            </CodeRow>
          </div>

          {/* Lens ring, drawn above both layers */}
          <div
            ref={ringRef}
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 rounded-full"
            style={{
              opacity: 0,
              border: "1.5px solid var(--accent-bright)",
              boxShadow: "0 0 0 6px color-mix(in srgb, var(--accent-bright) 14%, transparent), 0 18px 40px -12px rgb(0 0 0 / .45)",
            }}
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-ink px-2 py-0.5 font-mono text-[10.5px] whitespace-nowrap text-bg">
              backend
            </span>
          </div>
        </div>
      </div>

      {/* Network log: always visible, so touch users see the backend react too */}
      <figcaption className="mt-3 rounded-[14px] border border-line bg-surface/70 px-3.5 py-2.5 font-mono text-[12px] backdrop-blur">
        <div className="mb-1 flex items-center justify-between text-muted">
          <span>Network</span>
          <span>simulated API, real state</span>
        </div>
        <div role="log" aria-live="polite" aria-label="API requests">
        <ol className="grid gap-0.5">
          {log.map((r) => (
            <li key={r.n} className="flex gap-3 tabular">
              <span className="w-14 shrink-0 font-semibold text-ink">{r.method}</span>
              <span className="min-w-0 flex-1 truncate text-body">
                {r.path}
                {r.note ? <span className="text-muted"> · {r.note}</span> : null}
              </span>
              <span className={r.status >= 400 ? "text-accent" : "text-ok"}>{r.status}</span>
            </li>
          ))}
        </ol>
        </div>
      </figcaption>
    </figure>
  );
}

function Row({ h, className = "", children }: { h: number; className?: string; children: ReactNode }) {
  return (
    <div className={`flex items-center gap-3 px-5 transition-colors ${className}`} style={{ height: h }}>
      {children}
    </div>
  );
}

function CodeRow({ h, active, className = "", children }: { h: number; active: boolean; className?: string; children: ReactNode }) {
  const style: CSSProperties = { height: h, borderColor: "var(--c-line)", background: active ? "rgba(45,212,191,.12)" : undefined };
  return (
    <div className={`flex flex-col justify-center overflow-hidden whitespace-nowrap px-5 transition-colors ${className}`} style={style}>
      <div className="truncate">{children}</div>
    </div>
  );
}

const K = ({ children }: { children: ReactNode }) => <span style={{ color: "var(--c-kw)" }}>{children}</span>;
const Kk = ({ children }: { children: ReactNode }) => <span style={{ color: "var(--c-key)" }}>{children}</span>;
const S = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={className} style={{ color: "var(--c-str)" }}>
    {children}
  </span>
);
const N = ({ children }: { children: ReactNode }) => <span style={{ color: "var(--c-num)" }}>{children}</span>;
const F = ({ children }: { children: ReactNode }) => <span style={{ color: "var(--c-fn)" }}>{children}</span>;
const D = ({ children }: { children: ReactNode }) => <span style={{ color: "var(--c-dim)" }}>{children}</span>;
