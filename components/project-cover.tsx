import type { CSSProperties, ReactNode } from "react";

/**
 * Cover art for each project: a small illustrated scene of how the system works.
 * Pure SVG: crisp at any size, no downloads. Each project has its own colour world.
 * Motion runs only on hover (cards) and on the case-study page (see .cover-art in globals.css).
 * A real screenshot replaces the art when `cover` is set on the project in lib/content.ts.
 */

const W = 600;
const H = 250;
const INK = "#eef2fb";
const DIM = "#8f9bb3";

type Palette = { a: string; b: string; c: string };

function Scene({ id, p, label, children }: { id: string; p: Palette; label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="cover-art block h-auto w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${id}-g1`} cx="18%" cy="12%" r="70%">
          <stop offset="0" stopColor={p.a} stopOpacity=".55" />
          <stop offset="1" stopColor={p.a} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-g2`} cx="88%" cy="95%" r="65%">
          <stop offset="0" stopColor={p.b} stopOpacity=".45" />
          <stop offset="1" stopColor={p.b} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-g3`} cx="60%" cy="35%" r="35%">
          <stop offset="0" stopColor={p.c} stopOpacity=".28" />
          <stop offset="1" stopColor={p.c} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity=".09" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity=".45" />
        </filter>
      </defs>
      <rect width={W} height={H} fill="#070b14" />
      <rect width={W} height={H} fill={`url(#${id}-g1)`} />
      <rect width={W} height={H} fill={`url(#${id}-g2)`} />
      <rect width={W} height={H} fill={`url(#${id}-g3)`} />
      {/* perspective floor */}
      <g stroke={`url(#${id}-floor)`} strokeWidth="1">
        {Array.from({ length: 15 }, (_, i) => (
          <line key={`v${i}`} x1={300 + (i - 7) * 18} y1="150" x2={300 + (i - 7) * 120} y2={H} />
        ))}
        {[160, 176, 196, 222].map((y) => (
          <line key={y} x1="0" y1={y} x2={W} y2={y} />
        ))}
      </g>
      <g fontFamily="var(--font-sans)" fill={INK}>
        {children}
      </g>
    </svg>
  );
}

/** Frosted glass card */
function Glass({ x, y, w, h, r = 12, id, tint, children }: { x: number; y: number; w: number; h: number; r?: number; id: string; tint?: string; children?: ReactNode }) {
  return (
    <g filter={`url(#${id}-soft)`}>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={tint ?? "#ffffff"} fillOpacity={tint ? 0.14 : 0.06} stroke="#ffffff" strokeOpacity=".16" />
      <line x1={x + r} y1={y + 0.5} x2={x + w - r} y2={y + 0.5} stroke="#ffffff" strokeOpacity=".35" />
      {children}
    </g>
  );
}

/** Glowing connection + a packet that travels along it */
function Flow({ d, color, id, delay = 0, dur = 2.2 }: { d: string; color: string; id: string; delay?: number; dur?: number }) {
  const packet: CSSProperties = { offsetPath: `path("${d}")`, animationDuration: `${dur}s`, animationDelay: `${delay}s` };
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeOpacity=".22" strokeWidth="6" strokeLinecap="round" />
      <path d={d} fill="none" stroke={color} strokeOpacity=".75" strokeWidth="1.4" strokeLinecap="round" />
      <circle r="3.6" fill="#fff" className="cv-packet" style={packet} filter={`url(#${id}-glow)`} />
    </g>
  );
}

function Label({ x, y, children, size = 12, color = INK, weight = 600, anchor = "start", mono = false }: { x: number; y: number; children: ReactNode; size?: number; color?: string; weight?: number; anchor?: "start" | "middle" | "end"; mono?: boolean }) {
  return (
    <text x={x} y={y} fontSize={size} fill={color} fontWeight={weight} textAnchor={anchor} fontFamily={mono ? "var(--font-mono)" : undefined}>
      {children}
    </text>
  );
}

/* ── Scenes ─────────────────────────────────────────────────────────── */

const covers: Record<string, () => ReactNode> = {
  "alice-ivy": () => {
    const id = "ai";
    const p = { a: "#ff6fa8", b: "#8b5cf6", c: "#ffb37a" };
    const cx = 152, cy = 128, r = 70, len = 2 * Math.PI * r;
    const arcs: [number, number, string][] = [[0, 0.18, "#ff6f91"], [0.18, 0.46, "#7ee0b5"], [0.46, 0.54, "#ffd36e"], [0.54, 1, "#b69cff"]];
    return (
      <Scene id={id} p={p} label="Alice Ivy: a phone showing today's cycle phase, synced across iOS, Android and web, with one subscription kept in sync by Stripe and RevenueCat">
        {/* cycle ring behind the phone */}
        <g transform={`rotate(-90 ${cx} ${cy})`} filter={`url(#${id}-glow)`}>
          {arcs.map(([a, b, col]) => (
            <circle key={col} cx={cx} cy={cy} r={r} fill="none" stroke={col} strokeWidth="9" strokeLinecap="round"
              strokeDasharray={`${(b - a) * len - 7} ${len}`} strokeDashoffset={-a * len} />
          ))}
        </g>
        <g className="cv-orbit" style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx - r * 0.866} cy={cy + r * 0.5} r="7" fill="#fff" filter={`url(#${id}-glow)`} />
        </g>
        {/* phone */}
        <g className="cv-float">
          <rect x={cx - 44} y={34} width="88" height="176" rx="18" fill="#140c26" fillOpacity=".9" />
          <Glass id={id} x={cx - 44} y={34} w={88} h={176} r={18} tint="#1a1030">
            <rect x={cx - 14} y={41} width="28" height="5" rx="2.5" fill="#000" fillOpacity=".6" />
            <Label x={cx - 32} y={66} size={8} color={DIM} weight={500}>Today</Label>
            <Label x={cx - 32} y={82} size={13}>Day 14</Label>
            <Label x={cx - 32} y={95} size={8.5} color="#ffd36e">Ovulation phase</Label>
            <rect x={cx - 32} y={104} width="64" height="34" rx="7" fill="#ffffff" fillOpacity=".08" />
            <Label x={cx - 26} y={118} size={7.5} color={DIM} weight={500}>Focus at work</Label>
            <Label x={cx - 26} y={130} size={8.5}>Pitch, present</Label>
            <rect x={cx - 32} y={144} width="30" height="26" rx="6" fill="#ff6fa8" fillOpacity=".35" />
            <rect x={cx + 2} y={144} width="30" height="26" rx="6" fill="#8b5cf6" fillOpacity=".35" />
            <rect x={cx - 32} y={176} width="64" height="18" rx="9" fill="#fff" fillOpacity=".9" />
            <Label x={cx} y={188} size={8} color="#1a1030" anchor="middle">Journal</Label>
          </Glass>
        </g>
        {/* platforms → premium → billing */}
        {[["iOS", 52], ["Android", 104], ["Web", 156]].map(([t, y], i) => (
          <g key={t as string}>
            <Glass id={id} x={262} y={y as number} w={74} h={30} r={15}>
              <Label x={299} y={(y as number) + 19.5} size={11} anchor="middle">{t}</Label>
            </Glass>
            <Flow id={id} d={`M336 ${(y as number) + 15} C 372 ${(y as number) + 15} 372 121 404 121`} color={["#7dd3fc", "#7ee0b5", "#b69cff"][i]} delay={i * 0.5} />
          </g>
        ))}
        <Glass id={id} x={404} y={98} w={92} h={46} r={12} tint="#ffd36e">
          <Label x={450} y={118} size={12} anchor="middle">premium</Label>
          <Label x={450} y={133} size={8.5} color="#ffe7b0" anchor="middle" weight={500}>7-day free trial</Label>
        </Glass>
        <Flow id={id} d="M496 136 C 506 136 510 150 520 150" color="#a78bfa" delay={0.3} />
        <Flow id={id} d="M496 140 C 504 160 506 196 520 196" color="#ff6f91" delay={0.9} />
        <Glass id={id} x={520} y={136} w={68} h={28} r={14}><Label x={554} y={154} size={10} anchor="middle">Stripe</Label></Glass>
        <Glass id={id} x={520} y={182} w={68} h={28} r={14}><Label x={554} y={200} size={9} anchor="middle">RevenueCat</Label></Glass>
        <Label x={554} y={228} size={8} color={DIM} anchor="middle" weight={500}>webhooks → Postgres</Label>
      </Scene>
    );
  },

  "crypto-payment-gateway": () => {
    const id = "pg";
    const p = { a: "#6366f1", b: "#22d3ee", c: "#a855f7" };
    const chains: [string, string, string][] = [["ETH", "#8b9dff", "M0-9L6 0L0 9L-6 0Z"], ["BSC", "#f3ba2f", "M0-8L8 0L0 8L-8 0Z"], ["TRON", "#ff5c5c", "M-7-6H7L0 8Z"], ["SOL", "#14f195", "M-7-6H6L7-3H-6ZM-7-1H6L7 2H-6ZM-7 4H6L7 7H-6Z"]];
    return (
      <Scene id={id} p={p} label="Crypto payment gateway: Ethereum, BSC, Tron and Solana flowing into one gateway that confirms payments and notifies merchants">
        {chains.map(([n, col, glyph], i) => {
          const y = 42 + i * 50;
          return (
            <g key={n} className="cv-float" style={{ animationDelay: `${i * 0.4}s` }}>
              <circle cx="66" cy={y} r="19" fill={col} fillOpacity=".16" stroke={col} strokeOpacity=".8" filter={`url(#${id}-glow)`} />
              <path d={glyph} transform={`translate(66 ${y})`} fill={col} />
              <Label x={96} y={y + 4} size={11} color={col}>{n}</Label>
              <Flow id={id} d={`M128 ${y} C 190 ${y} 200 125 252 125`} color={col} delay={i * 0.45} />
            </g>
          );
        })}
        {/* gateway core */}
        <g filter={`url(#${id}-glow)`}>
          <path d="M300 72 L346 98 L346 152 L300 178 L254 152 L254 98 Z" fill="#6366f1" fillOpacity=".22" stroke="#a5b4fc" strokeWidth="1.5" />
        </g>
        <circle cx="300" cy="125" r="38" fill="none" stroke="#a5b4fc" strokeOpacity=".5" className="cv-ping" style={{ transformOrigin: "300px 125px" }} />
        <Label x={300} y={122} size={13} anchor="middle">gateway</Label>
        <Label x={300} y={137} size={8.5} color={DIM} anchor="middle" weight={500}>chain-agnostic</Label>
        <Flow id={id} d="M346 112 C 380 112 384 78 414 78" color="#22d3ee" delay={0.6} />
        <Flow id={id} d="M346 140 C 380 140 384 174 414 174" color="#a855f7" delay={1.1} />
        {/* checkout + webhook */}
        <g className="cv-float" style={{ animationDelay: ".8s" }}>
          <Glass id={id} x={414} y={34} w={166} h={86} r={14}>
            <Label x={430} y={56} size={9} color={DIM} weight={500}>Payment</Label>
            <Label x={430} y={78} size={19}>0.42 ETH</Label>
            <rect x={430} y={90} width="62" height="20" rx="10" fill="#14f195" fillOpacity=".2" />
            <Label x={461} y={103.5} size={9.5} color="#14f195" anchor="middle">Paid ✓</Label>
            <Label x={566} y={103.5} size={8.5} color={DIM} anchor="end" mono>ws · live</Label>
          </Glass>
        </g>
        <Glass id={id} x={414} y={156} w={166} h={40} r={12}>
          <Label x={430} y={180} size={10.5} mono color="#a5f3fc">POST /webhook</Label>
          <Label x={566} y={180} size={10.5} mono color="#14f195" anchor="end">200</Label>
        </Glass>
      </Scene>
    );
  },

  "nft-marketplace": () => {
    const id = "nft";
    const p = { a: "#ec4899", b: "#06b6d4", c: "#f59e0b" };
    const card = (x: number, y: number, rot: number, g1: string, g2: string, n: string, k: string, front = false) => (
      <g transform={`rotate(${rot} ${x + 60} ${y + 80})`} key={n}>
        <defs>
          <linearGradient id={`${id}-${k}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={g1} />
            <stop offset="1" stopColor={g2} />
          </linearGradient>
        </defs>
        <Glass id={id} x={x} y={y} w={120} h={160} r={14}>
          <rect x={x + 8} y={y + 8} width="104" height="104" rx="10" fill={`url(#${id}-${k})`} />
          <circle cx={x + 60} cy={y + 58} r="24" fill="#fff" fillOpacity=".25" />
          <circle cx={x + 74} cy={y + 46} r="10" fill="#fff" fillOpacity=".35" />
          {front ? (
            <>
              <Label x={x + 10} y={y + 132} size={10.5}>{n}</Label>
              <Label x={x + 10} y={y + 148} size={8.5} color={DIM} weight={500}>ERC-721 · verified</Label>
            </>
          ) : null}
        </Glass>
      </g>
    );
    return (
      <Scene id={id} p={p} label="NFT marketplace: a fanned stack of NFT cards with a live auction bid">
        <g className="cv-float" style={{ animationDelay: ".6s" }}>{card(112, 50, -14, "#06b6d4", "#3b82f6", "#0038", "c1")}</g>
        <g className="cv-float" style={{ animationDelay: ".3s" }}>{card(196, 40, 9, "#f59e0b", "#ef4444", "#0051", "c2")}</g>
        <g className="cv-float">{card(150, 34, -2, "#ec4899", "#8b5cf6", "#0042", "c3", true)}</g>
        <Glass id={id} x={378} y={46} w={196} h={72} r={14}>
          <Label x={394} y={68} size={9} color={DIM} weight={500}>Live auction · #0042</Label>
          <Label x={394} y={94} size={20}>1.20 ETH</Label>
          <Label x={560} y={94} size={10} color="#f9a8d4" anchor="end" mono>02:14:09</Label>
          <rect x={394} y={104} width="164" height="4" rx="2" fill="#fff" fillOpacity=".12" />
          <rect x={394} y={104} width="112" height="4" rx="2" fill="#ec4899" className="cv-grow" />
        </Glass>
        <g>
          <Glass id={id} x={378} y={132} w={92} h={34} r={17} tint="#ec4899"><Label x={424} y={153} size={11} anchor="middle">Place bid</Label></Glass>
          <Glass id={id} x={482} y={132} w={92} h={34} r={17}><Label x={528} y={153} size={11} anchor="middle">Buy now</Label></Glass>
        </g>
        <Label x={378} y={196} size={9} color={DIM} weight={500} mono>Transfer(owner → 0x7a…c3) ✓ indexed</Label>
      </Scene>
    );
  },

  "gaming-backends": () => {
    const id = "gm";
    const p = { a: "#22c55e", b: "#a3e635", c: "#06b6d4" };
    const cx = 300, cy = 120, n = 16;
    return (
      <Scene id={id} p={p} label="Gaming backends: many players connected in real time to one Socket.IO server, events under 100 milliseconds">
        {Array.from({ length: n }, (_, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(a) * 230, y = cy + Math.sin(a) * 92;
          const col = ["#4ade80", "#22d3ee", "#a3e635", "#f472b6"][i % 4];
          return (
            <g key={i}>
              <Flow id={id} d={`M${x.toFixed(1)} ${y.toFixed(1)} L${cx} ${cy}`} color={col} delay={(i % 5) * 0.35} dur={1.4} />
              <circle cx={x} cy={y} r="11" fill={col} fillOpacity=".18" stroke={col} />
              <circle cx={x} cy={y - 2} r="3.4" fill={col} />
              <path d={`M${x - 5} ${y + 6} q5 -6 10 0`} stroke={col} fill="none" />
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="46" fill="none" stroke="#4ade80" strokeOpacity=".6" className="cv-ping" style={{ transformOrigin: `${cx}px ${cy}px` }} />
        <circle cx={cx} cy={cy} r="40" fill="#052e16" fillOpacity=".8" stroke="#4ade80" strokeWidth="1.5" filter={`url(#${id}-glow)`} />
        <Label x={cx} y={cy - 4} size={12} anchor="middle">socket.io</Label>
        <Label x={cx} y={cy + 13} size={11} anchor="middle" color="#86efac" mono>38ms</Label>
        <Glass id={id} x={18} y={18} w={128} h={44} r={12}>
          <Label x={32} y={36} size={8.5} color={DIM} weight={500}>players</Label>
          <Label x={32} y={53} size={14}>500K+</Label>
        </Glass>
        <Glass id={id} x={454} y={18} w={128} h={44} r={12}>
          <Label x={468} y={36} size={8.5} color={DIM} weight={500}>event latency</Label>
          <Label x={468} y={53} size={14} color="#86efac">&lt; 100ms</Label>
        </Glass>
      </Scene>
    );
  },

  "edublock-pro": () => {
    const id = "eb";
    const p = { a: "#f59e0b", b: "#3b82f6", c: "#fde68a" };
    const shards: [string, string, number, string][] = [["share 1", "server · store A", 40, "#60a5fa"], ["share 2", "server · store B", 108, "#a78bfa"], ["share 3", "emailed to user", 176, "#fb923c"]];
    const cube = (x: number, y: number, col: string, k: number) => (
      <g key={k} className="cv-float" style={{ animationDelay: `${k * 0.3}s` }}>
        <path d={`M${x} ${y} l26 -14 l26 14 l-26 14 Z`} fill={col} fillOpacity=".55" />
        <path d={`M${x} ${y} l26 14 v30 l-26 -14 Z`} fill={col} fillOpacity=".3" />
        <path d={`M${x + 52} ${y} l-26 14 v30 l26 -14 Z`} fill={col} fillOpacity=".18" />
        <path d={`M${x} ${y} l26 -14 l26 14 v30 l-26 14 l-26 -14 Z`} fill="none" stroke={col} strokeOpacity=".8" />
      </g>
    );
    return (
      <Scene id={id} p={p} label="EduBlock Pro: three Shamir key shares combine into one private key that seals question papers on the blockchain">
        {shards.map(([t, s, y, col], i) => (
          <g key={t}>
            <Glass id={id} x={20} y={y - 18} w={136} h={44} r={12}>
              <path d={`M38 ${y - 6} l10 6 -10 6z`} fill={col} />
              <Label x={56} y={y + 1} size={11.5}>{t}</Label>
              <Label x={56} y={y + 15} size={8.5} color={DIM} weight={500}>{s}</Label>
            </Glass>
            <Flow id={id} d={`M156 ${y + 4} C 200 ${y + 4} 204 112 240 112`} color={col} delay={i * 0.5} />
          </g>
        ))}
        {/* key */}
        <g filter={`url(#${id}-glow)`} className="cv-float">
          <circle cx="272" cy="112" r="32" fill="#f59e0b" fillOpacity=".15" stroke="#fcd34d" strokeWidth="1.5" />
          <circle cx="262" cy="112" r="9" fill="none" stroke="#fcd34d" strokeWidth="3" />
          <path d="M271 112 h20 v8 m-7 -8 v6" stroke="#fcd34d" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
        <Label x={272} y={164} size={10} anchor="middle" color="#fcd34d">3 of 3 → key</Label>
        <Label x={272} y={177} size={8.5} anchor="middle" color={DIM} weight={500}>never stored whole</Label>
        <Flow id={id} d="M304 112 L356 112" color="#fcd34d" delay={0.4} />
        {cube(360, 104, "#3b82f6", 0)}
        {cube(424, 92, "#6366f1", 1)}
        {cube(488, 104, "#f59e0b", 2)}
        <Label x={540} y={176} size={10} anchor="end" color="#fcd34d">question paper sealed ✓</Label>
        <Label x={360} y={60} size={9} color={DIM} weight={500} mono>block #1024 → #1026</Label>
      </Scene>
    );
  },

  edgeup: () => {
    const id = "eu";
    const p = { a: "#06b6d4", b: "#3b82f6", c: "#22d3ee" };
    const face = (cx: number, cy: number, col: string, k = 1) => (
      <g transform={`translate(${cx} ${cy}) scale(${k}) translate(${-cx} ${-cy})`}>
        <ellipse cx={cx} cy={cy - 8} rx="20" ry="24" fill="none" stroke={col} strokeWidth="1.5" />
        <path d={`M${cx - 36} ${cy + 46} q36 -42 72 0`} fill="none" stroke={col} strokeWidth="1.5" />
        {[[-8, -12], [8, -12], [0, -2], [-7, 6], [7, 6], [0, 9]].map(([dx, dy], i) => (
          <circle key={i} cx={cx + dx} cy={cy + dy} r="1.6" fill={col} />
        ))}
      </g>
    );
    return (
      <Scene id={id} p={p} label="EdgeUp: the live camera image is matched against the Aadhaar ID photo before the computer-based test unlocks">
        {/* ID card */}
        <g transform="rotate(-6 100 125)">
          <Glass id={id} x={28} y={66} w={150} h={96} r={12}>
            <rect x={40} y={78} width="46" height="58" rx="6" fill="#0e7490" fillOpacity=".35" />
            <clipPath id={`${id}-idclip`}><rect x={40} y={78} width="46" height="58" rx="6" /></clipPath>
            <g clipPath={`url(#${id}-idclip)`}>{face(63, 104, "#67e8f9", 0.62)}</g>
            <rect x={96} y={84} width="66" height="6" rx="3" fill="#fff" fillOpacity=".5" />
            <rect x={96} y={98} width="50" height="5" rx="2.5" fill="#fff" fillOpacity=".25" />
            <rect x={96} y={110} width="58" height="5" rx="2.5" fill="#fff" fillOpacity=".25" />
            <Label x={40} y={152} size={9} color={DIM} weight={500}>ID photo · at sign-up</Label>
          </Glass>
        </g>
        {/* live scan frame */}
        <g>
          <rect x={232} y={38} width="132" height="152" rx="16" fill="#06b6d4" fillOpacity=".08" />
          {[[232, 38, 1, 1], [364, 38, -1, 1], [232, 190, 1, -1], [364, 190, -1, -1]].map(([x, y, sx, sy], i) => (
            <path key={i} d={`M${x} ${y + 22 * sy} V${y} H${x + 22 * sx}`} stroke="#67e8f9" strokeWidth="3" fill="none" strokeLinecap="round" filter={`url(#${id}-glow)`} />
          ))}
          {face(298, 108, "#a5f3fc")}
          <rect x={240} y={46} width="116" height="2.5" rx="1.25" fill="#67e8f9" className="cv-scan" filter={`url(#${id}-glow)`} />
          <Label x={298} y={210} size={9.5} anchor="middle" color={DIM} weight={500}>live capture · before the paper</Label>
        </g>
        <Flow id={id} d="M364 114 L414 114" color="#4ade80" />
        <g filter={`url(#${id}-glow)`} className="cv-float">
          <circle cx="440" cy="114" r="24" fill="#22c55e" fillOpacity=".2" stroke="#4ade80" strokeWidth="1.5" />
          <path d="M429 114 l8 8 l15 -17" stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <Glass id={id} x={476} y={88} w={106} h={52} r={12}>
          <Label x={490} y={109} size={11.5}>CBT unlocked</Label>
          <Label x={490} y={126} size={8.5} color="#86efac" weight={500}>same person ✓</Label>
        </Glass>
      </Scene>
    );
  },

  lern360: () => {
    const id = "ln";
    const p = { a: "#7b2ff7", b: "#22d3ee", c: "#f472b6" };
    return (
      <Scene id={id} p={p} label="LERN360: a course bought with LERN tokens through a smart contract, which unlocks the course and issues an on-chain certificate">
        <g className="cv-float" style={{ animationDelay: ".5s" }}>
          <Glass id={id} x={24} y={50} w={132} h={130} r={14}>
            <rect x={36} y={62} width="108" height="56" rx="9" fill="#7b2ff7" fillOpacity=".45" />
            <path d="M80 80 l18 10 l-18 10 z" fill="#fff" fillOpacity=".9" />
            <Label x={36} y={136} size={11.5}>Course</Label>
            <Label x={36} y={151} size={8.5} color={DIM} weight={500}>Node.js API</Label>
            <rect x={36} y={160} width="108" height="5" rx="2.5" fill="#fff" fillOpacity=".12" />
            <rect x={36} y={160} width="70" height="5" rx="2.5" fill="#22d3ee" />
          </Glass>
        </g>
        <Flow id={id} d="M156 115 L196 115" color="#c4b5fd" />
        <g filter={`url(#${id}-glow)`} className="cv-orbit-slow" style={{ transformOrigin: "228px 115px" }}>
          <circle cx="228" cy="115" r="30" fill="#7b2ff7" fillOpacity=".3" stroke="#c4b5fd" strokeWidth="1.5" />
          <circle cx="228" cy="115" r="22" fill="none" stroke="#c4b5fd" strokeOpacity=".6" strokeDasharray="3 4" />
        </g>
        <Label x={228} y={119} size={11} anchor="middle">LERN</Label>
        <Flow id={id} d="M258 115 L298 115" color="#c4b5fd" delay={0.4} />
        <Glass id={id} x={298} y={86} w={104} h={58} r={12}>
          <Label x={312} y={108} size={11.5}>Contract</Label>
          <Label x={312} y={124} size={8.5} color={DIM} weight={500} mono>tx confirmed?</Label>
          <circle cx="386" cy="104" r="4" fill="#4ade80" className="cv-blink" />
        </Glass>
        <Flow id={id} d="M402 104 C 430 104 432 66 458 66" color="#22d3ee" delay={0.8} />
        <Flow id={id} d="M402 128 C 430 128 432 160 458 160" color="#f472b6" delay={1.2} />
        <Glass id={id} x={458} y={44} w={124} h={42} r={12}>
          <Label x={472} y={63} size={11}>Course unlocked</Label>
          <Label x={472} y={77} size={8.5} color={DIM} weight={500}>after confirmation</Label>
        </Glass>
        <g className="cv-float">
          <Glass id={id} x={458} y={124} w={124} h={74} r={12} tint="#f472b6">
            <Label x={472} y={146} size={9} color="#fbcfe8" weight={500}>Certificate</Label>
            <Label x={472} y={164} size={12}>On-chain ✓</Label>
            <circle cx="558" cy="176" r="12" fill="#fde68a" fillOpacity=".85" />
            <path d="M552 186 l-3 10 l9 -4 l9 4 l-3 -10" fill="#fde68a" fillOpacity=".7" />
          </Glass>
        </g>
      </Scene>
    );
  },

  dwellpilot: () => {
    const id = "dp";
    const p = { a: "#1e3a8a", b: "#f59e0b", c: "#38bdf8" };
    return (
      <Scene id={id} p={p} label="DwellPilot: a London terrace at night with one lit window, beside cards for verified rent and a gas safety reminder">
        {Array.from({ length: 26 }, (_, i) => (
          <circle key={i} cx={(i * 83) % 600} cy={(i * 37) % 120} r={i % 3 ? 0.9 : 1.5} fill="#fff" fillOpacity={i % 4 ? 0.5 : 0.9} className={i % 5 === 0 ? "cv-blink" : undefined} style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
        <circle cx="520" cy="44" r="18" fill="#fde68a" fillOpacity=".9" filter={`url(#${id}-glow)`} />
        <path d="M60 230 V96 l64 -34 l64 34 V230 Z" fill="#0b1630" stroke="#1e3a8a" />
        <path d="M188 230 V104 l58 -30 l58 30 V230 Z" fill="#0d1a38" stroke="#1e3a8a" />
        <path d="M304 230 V96 l64 -34 l64 34 V230 Z" fill="#0b1630" stroke="#1e3a8a" />
        {[[84, 112], [134, 112], [84, 164], [134, 164], [208, 120], [258, 120], [208, 170], [258, 170], [328, 112], [378, 112], [328, 164], [378, 164]].map(([x, y], i) => {
          const lit = i === 4;
          return (
            <g key={i}>
              {lit ? <rect x={x - 10} y={y - 10} width="48" height="58" rx="6" fill="#fbbf24" fillOpacity=".35" filter={`url(#${id}-glow)`} className="cv-glow" /> : null}
              <rect x={x} y={y} width="28" height="38" rx="3" fill={lit ? "#fcd34d" : "#13254a"} />
              <line x1={x + 14} y1={y} x2={x + 14} y2={y + 38} stroke="#0b1630" strokeOpacity=".7" />
            </g>
          );
        })}
        <Glass id={id} x={450} y={86} w={132} h={46} r={12}>
          <Label x={464} y={106} size={11}>Rent verified</Label>
          <Label x={464} y={121} size={8.5} color="#86efac" weight={500}>£1,250.00 · human approved</Label>
        </Glass>
        <Glass id={id} x={450} y={142} w={132} h={46} r={12}>
          <Label x={464} y={162} size={11}>Gas safety (CP12)</Label>
          <Label x={464} y={177} size={8.5} color="#fdba74" weight={500}>due in 23 days</Label>
        </Glass>
      </Scene>
    );
  },
};

export function ProjectCover({ slug, image, alt }: { slug: string; image?: string; alt?: string }) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt={alt ?? ""} className="block aspect-[600/250] w-full object-cover" loading="lazy" />;
  }
  const draw = covers[slug];
  return draw ? draw() : null;
}
