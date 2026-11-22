/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL PORTFOLIO CONTENT LIVES HERE.
 *  Anything wrapped in [square brackets] is a placeholder: replace it with your
 *  real details. `npm run dev` lists every remaining placeholder in the terminal.
 *  Only write what is true. No invented metrics, clients or testimonials.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Shubham Morr",
  role: "Full-stack developer",
  focus: "Backend · Web3 · Mobile",
  location: "Mohali, India",
  photo: "/images/shubham.jpg", // square photo in /public; set to "" to hide
  // One line under your name. Keep it about what you do for people, not adjectives.
  tagline:
    "I build the systems behind products: NestJS and Node.js backends, real-time and Web3 platforms, and the apps that sit on top of them.",
  // Shown as a status pill. Set to "" to hide.
  availability: "Open to backend and full-stack roles",
  email: "mors6960@gmail.com",
  resumeUrl: "/resume.pdf", // file lives in /public; set to "" to hide the button
  github: "https://github.com/mors6960",
  githubUser: "mors6960",
  linkedin: "https://www.linkedin.com/in/shubham-morr-41727a202",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const about: string[] = [
  "I'm a backend-focused full-stack developer with almost 3 years at Antier Solutions: 2.5 years full-time, after a 6-month internship. I build production Node.js and NestJS systems: REST and WebSocket APIs, real-time gaming backends, and blockchain platforms.",
  "Most of my work sits where reliability matters: a multi-chain crypto payment gateway, an NFT marketplace, gaming backends serving 500K+ users, and a subscription system that keeps Stripe, the App Store and Google Play in sync for a wellness app I built on my own.",
  "I care about the boring parts done well: clear API contracts, idempotent webhooks, tests, and CI/CD that ships without drama. Right now I'm adding Go to my backend toolkit.",
  "I hold an MCA and a BCA from Chitkara University, Punjab.",
];

export type Experience = {
  period: string; // "2026 — Present"
  role: string;
  company: string;
  url?: string;
  summary: string;
  tech: string[];
};

export const experience: Experience[] = [
  {
    period: "Jul 2024 — Present",
    role: "MERN Stack Developer (Backend & Web3)",
    company: "Antier Solutions",
    url: "https://www.antiersolutions.com/",
    summary:
      "Build and maintain NestJS/Node.js services (REST and WebSockets) for production gaming and Web3 products serving 500K+ users. Designed versioned, JWT-secured APIs for web and mobile clients, cut response times by up to 40% on critical endpoints through PostgreSQL and MongoDB query work, set up GitHub Actions CI/CD to AWS, and wrote Jest and Mocha test suites. In 2025 I was the only backend developer on three LMS platforms (EduBlock Pro, LERN360, EdgeUp), built on one architecture I designed.",
    tech: ["NestJS", "Node.js", "Socket.IO", "PostgreSQL", "MongoDB", "AWS", "GitHub Actions", "Jest"],
  },
  {
    period: "Jan 2026 — Present",
    role: "Solo full-stack & mobile developer (freelance)",
    company: "Alice Ivy",
    url: "https://www.aliceivy.co/",
    summary:
      "Built a cycle-synced wellness app from the first commit to App Store and Google Play release: one React + TypeScript codebase for iOS, Android and web, a Supabase backend, cross-platform subscriptions across Stripe and RevenueCat, and a NestJS admin panel. Around 500 users so far.",
    tech: ["React", "TypeScript", "Capacitor", "Supabase", "Stripe", "RevenueCat", "NestJS"],
  },
  {
    period: "Jan 2024 — Jul 2024",
    role: "Software Development Intern",
    company: "Antier Solutions",
    summary:
      "Backend development with Node.js and databases under senior developers: REST API work and bug fixes. Converted to a full-time role in July 2024.",
    tech: ["Node.js", "Express", "MongoDB", "REST APIs"],
  },
];

export type Project = {
  slug: string;
  title: string;
  year: string;
  oneLiner: string;
  role: string;
  context?: string; // e.g. "Client project at Antier Solutions"
  ribbon?: string; // diagonal corner banner on the card, e.g. "Freelance project"
  cover?: string; // optional real screenshot in /public (e.g. "/images/projects/alice-ivy.png"); otherwise drawn art
  featured?: boolean;
  tech: string[];
  links?: { label: string; url: string }[];
  // Case study (shown on /work/<slug>)
  problem: string;
  approach: string[];
  architecture: { label: string; items: string[] }[];
  hardParts: { title: string; body: string }[];
  results: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "alice-ivy",
    title: "Alice Ivy: Cycle-Synced Wellness App",
    year: "2026",
    oneLiner:
      "A women's wellness app live on iOS, Android and web, built end to end by a single developer, from cycle tracking to subscription billing.",
    role: "Solo full-stack & mobile developer, from first commit to App Store and Play Store release",
    context: "Freelance project",
    ribbon: "Freelance project",
    featured: true,
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Capacitor", "Supabase", "Stripe", "RevenueCat", "NestJS", "TanStack Query", "Resend", "Gemini", "Railway", "Vercel"],
    links: [
      { label: "Website", url: "https://www.aliceivy.co/" },
      { label: "App Store", url: "https://apps.apple.com/in/app/alice-ivy/id6762295400" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.aliceivy.app" },
    ],
    problem:
      "Alice Ivy helps women plan their work, energy and self-care around their menstrual cycle: which phase she's in, what to focus on at work, meditations, journaling and AI-generated insights. It had to ship on iOS, Android and the web, with one developer and one subscription that works everywhere.",
    approach: [
      "One React + TypeScript codebase shipped to the App Store and Google Play with Capacitor, and to the web.",
      "A cross-platform subscription model: Stripe for web, RevenueCat for App Store and Google Play, one shared premium entitlement and a 7-day free trial.",
      "A Supabase backend: Postgres with row-level security, auth, storage, scheduled jobs and ~40 edge functions.",
      "Cycle-tracking logic (phases, ovulation window, period predictions, adaptive cycle length) reused across the app, notifications and calendar sync.",
      "AI features for journal reflections, cycle insights and a wellness companion chat.",
      "Personalised notifications (web push, local mobile notifications, transactional email with Resend) and calendar integrations with Google, Apple and an Outlook feed.",
      "A separate admin panel (NestJS API + React) for members, subscriptions, payments, promo codes and free access, with two-factor sign-in and a full audit log.",
    ],
    architecture: [
      { label: "Clients", items: ["React + TypeScript (Vite)", "Capacitor for iOS and Android", "Web app on Vercel"] },
      { label: "Backend", items: ["Supabase Postgres + RLS", "Auth, Storage, scheduled jobs", "~40 Edge Functions"] },
      { label: "Billing & ops", items: ["Stripe + RevenueCat webhooks", "NestJS admin API on Railway", "Resend email, Web Push"] },
    ],
    hardParts: [
      {
        title: "One subscription across three stores",
        body: "Apple and Google require their own in-app purchases, while web users pay through Stripe. I made the database the single source of truth, and Stripe and RevenueCat webhooks keep it in sync through trials, renewals, cancellations, refunds, restores and account transfers.",
      },
      {
        title: "Safe, retry-proof billing events",
        body: "Webhook handling is idempotent and retry-safe, with repair jobs that detect and fix drift, and checks so one user's purchase can never be written onto another account.",
      },
    ],
    results: [
      { value: "3", label: "platforms from one codebase: iOS, Android and web" },
      { value: "~40", label: "Supabase edge functions in production" },
      { value: "~500", label: "users since launch" },
    ],
  },
  {
    slug: "crypto-payment-gateway",
    title: "Multi-Chain Crypto Payment Gateway",
    year: "2025",
    oneLiner: "A Stripe-style payment gateway for crypto: merchants accept payments across Ethereum, BSC, Tron, Solana and more.",
    role: "Backend architect",
    context: "Client project at Antier Solutions",
    featured: true,
    tech: ["Node.js", "NestJS", "WebSockets", "PostgreSQL", "Ethereum", "BSC", "Tron", "Solana"],
    problem:
      "Merchants wanted to accept crypto the way they accept cards: generate a payment, get notified when it's paid, reconcile it. Every chain behaves differently, and confirmations arrive at different speeds.",
    approach: [
      "Architected a multi-chain gateway supporting Ethereum, BSC, Tron, Solana and other networks.",
      "Automated wallet generation, transaction tracking and merchant webhooks.",
      "Real-time payment confirmation pushed to clients over WebSockets.",
    ],
    architecture: [
      { label: "API", items: ["Merchant REST API", "Webhooks to merchants", "WebSocket confirmations"] },
      { label: "Core", items: ["Chain-agnostic payment engine", "Wallet generation", "Transaction tracker"] },
      { label: "Chains", items: ["Ethereum / BSC", "Tron", "Solana + more via adapters"] },
    ],
    hardParts: [
      {
        title: "Adding a chain without touching the core",
        body: "The backend is modular and chain-agnostic: each network lives behind an adapter, so new blockchains can be integrated quickly without changing payment logic.",
      },
    ],
    results: [
      { value: "4+", label: "blockchain networks supported" },
      { value: "Real-time", label: "payment confirmation over WebSockets" },
    ],
  },
  {
    slug: "nft-marketplace",
    title: "NFT Marketplace",
    year: "2025",
    oneLiner: "An Ethereum NFT marketplace with auctions, buy-now and peer-to-peer trading.",
    role: "Full-stack & smart contract developer",
    context: "Antier Solutions",
    tech: ["Solidity", "ERC-721", "Ethereum", "NestJS", "Next.js", "React"],
    problem: "Creators and collectors needed one place to auction, sell and trade NFTs, with on-chain ownership always matching what the app shows.",
    approach: [
      "Wrote and deployed ERC-721 smart contracts for buy, sell, burn and ownership transfer.",
      "Built auction, buy-now and peer-to-peer trading flows.",
      "Integrated contract event listeners with the NestJS APIs and the React/Next.js frontend.",
    ],
    architecture: [
      { label: "On-chain", items: ["ERC-721 contracts", "Marketplace logic", "Event emission"] },
      { label: "Backend", items: ["NestJS APIs", "Contract event listeners", "Indexed marketplace state"] },
      { label: "Frontend", items: ["Next.js + React", "Wallet connection"] },
    ],
    hardParts: [
      {
        title: "Keeping the app in step with the chain",
        body: "Contract events drive backend state, so listings, bids and ownership in the app follow what actually happened on-chain.",
      },
    ],
    results: [{ value: "~30%", label: "faster delivery using AI coding tools (Cursor, Claude Code)" }],
  },
  {
    slug: "gaming-backends",
    title: "Real-Time Gaming Backends",
    year: "2025",
    oneLiner: "Low-latency REST and Socket.IO backends for tap, cricket and mini-games with 500K+ users.",
    role: "Backend developer",
    context: "Antier Solutions",
    tech: ["Node.js", "Socket.IO", "REST APIs", "PostgreSQL", "MongoDB"],
    problem: "Concurrent players need game events to sync instantly; any lag is visible and breaks the game.",
    approach: [
      "Built REST and Socket.IO backends for tap, cricket and mini-games.",
      "Real-time event sync for concurrent players.",
      "Optimised event-handling pipelines for interactive game events.",
    ],
    architecture: [
      { label: "Realtime", items: ["Socket.IO gateways", "Event sync for concurrent players"] },
      { label: "API", items: ["REST endpoints", "JWT auth"] },
      { label: "Data", items: ["PostgreSQL / MongoDB", "Optimised queries"] },
    ],
    hardParts: [{ title: "Sub-100ms under load", body: "Event-handling pipelines were optimised until interactive game events responded in under 100 ms." }],
    results: [
      { value: "500K+", label: "users served" },
      { value: "<100ms", label: "response for interactive game events" },
    ],
  },
  {
    slug: "edublock-pro",
    title: "EduBlock Pro",
    year: "2025",
    oneLiner: "A blockchain-powered examination platform for Indian institutions: tamper-proof question papers, verified results and credentials.",
    role: "Sole backend developer in a 3–4 person team",
    context: "Antier Solutions product",
    tech: ["NestJS", "PostgreSQL", "JWT", "RBAC", "Blockchain", "Shamir's Secret Sharing"],
    links: [{ label: "Website", url: "https://edublockpro.com/" }],
    problem:
      "Paper leaks and exam fraud damage trust in exams. EduBlock Pro covers registration with identity verification, exam applications, secure examination and blockchain-verified results. Question papers go on-chain, so the private key that protects them becomes the most sensitive secret in the system.",
    approach: [
      "Developed the backend: role-based authentication for students, exam authorities and institutions.",
      "Designed the database, including triggers and stored procedures for exam and result workflows.",
      "Protected the blockchain signing key with Shamir's Secret Sharing, so no single place ever holds the whole key.",
      "Designed a common backend architecture that I then reused across all three LMS projects I built in 2025 (EduBlock Pro, LERN360 and EdgeUp).",
    ],
    architecture: [
      { label: "Users", items: ["Students", "Exam authorities", "Institutions"] },
      { label: "Backend", items: ["NestJS + PostgreSQL", "JWT auth + RBAC", "Triggers & stored procedures"] },
      { label: "Trust layer", items: ["Question papers on-chain", "Key split with Shamir's Secret Sharing", "Verifiable certificates"] },
    ],
    hardParts: [
      {
        title: "Keeping the private key secret",
        body: "Every question paper went on the blockchain, so the private key could not live in one place. I split it into three shares with Shamir's Secret Sharing: two stay in separate places on the backend and the third is emailed to the user. The key exists only for the moment all three shares are combined.",
      },
    ],
    results: [
      { value: "3", label: "key shares, never stored together" },
      { value: "500–1000", label: "students across 2 partner institutes" },
    ],
  },
  {
    slug: "edgeup",
    title: "EdgeUp",
    year: "2025",
    oneLiner: "An AI-powered learning platform for institutions preparing students for UPSC, state and other competitive exams. I built the backend of its computer-based test (CBT) platform, including AI identity checks.",
    role: "Sole backend developer",
    context: "Client project for Zaryah Angel Network, at Antier Solutions",
    tech: ["NestJS", "Python", "AI / face verification", "REST APIs"],
    links: [{ label: "Website", url: "https://www.edgeup.in/" }],
    problem:
      "EdgeUp unifies students, teachers, parents and management on one platform (AI agent, LMS and ERP). Its computer-based tests needed to be trustworthy: the person sitting the paper must be the person who registered.",
    approach: [
      "Built the backend of the CBT platform for quizzes and exam papers.",
      "Built an AI proctoring model in Python that captures the candidate's photo before the paper starts.",
      "The model compares that photo with the Aadhaar photo given at sign-up, and only the verified candidate can begin.",
      "Reused my common LMS backend architecture from EduBlock Pro and LERN360, without the blockchain layer, since EdgeUp is not a Web3 product.",
    ],
    architecture: [
      { label: "Exam flow", items: ["Sign-up with Aadhaar photo", "Photo capture before start", "CBT papers and quizzes"] },
      { label: "Backend", items: ["NestJS APIs", "Exam and attempt management"] },
      { label: "AI service", items: ["Python face verification", "Proctoring checks"] },
    ],
    hardParts: [
      {
        title: "Matching faces across years",
        body: "Aadhaar photos are often old. In testing, the model correctly matched me against my own Aadhaar photo, which was taken when I was in class 8 or 9.",
      },
    ],
    results: [
      { value: "AI", label: "identity check before every paper" },
      { value: "4", label: "user roles on the platform: students, teachers, parents, management" },
    ],
  },
  {
    slug: "lern360",
    title: "LERN360",
    year: "2025",
    oneLiner: "A learning and career platform where course purchases and certificates run on-chain with LERN tokens. I built the LMS backend and its blockchain integration.",
    role: "Sole backend developer",
    context: "Client project at Antier Solutions",
    tech: ["Node.js", "REST APIs", "Smart contracts", "LERN token"],
    links: [{ label: "Website", url: "https://www.lern360.ai/" }],
    problem:
      "LERN360 connects course discovery, a wallet for credentials and career tools. In the version I worked on, buying and selling courses and issuing certificates happened on the blockchain with the LERN token, so the app and the chain had to agree at every step.",
    approach: [
      "Built all of the LMS backend APIs.",
      "Integrated the backend with the smart contracts for buying and selling courses with LERN tokens.",
      "On-chain certificates issued on course completion.",
      "Built on the same backend architecture I designed for EduBlock Pro, so auth, roles and course workflows were proven before day one.",
    ],
    architecture: [
      { label: "LMS", items: ["Courses and enrolments", "Progress and completion"] },
      { label: "Backend", items: ["Node.js REST APIs", "Contract integration layer"] },
      { label: "On-chain", items: ["LERN token payments", "Certificates"] },
    ],
    hardParts: [
      {
        title: "Keeping the backend and the contracts in sync",
        body: "Every purchase and certificate touched both the database and the blockchain. The hard part was ordering each step so a course is only unlocked, and a certificate only issued, once the matching on-chain transaction is confirmed.",
      },
    ],
    results: [
      { value: "100%", label: "of the LMS backend APIs built by me" },
      { value: "On-chain", label: "course purchases and certificates with LERN tokens" },
    ],
  },
  {
    slug: "dwellpilot",
    title: "DwellPilot",
    year: "2026",
    oneLiner: "Property operations for UK letting agencies: rent checks, compliance records and repairs, with AI that suggests and people who approve.",
    role: "Founder: product, design and engineering",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "MDX"],
    links: [{ label: "Source", url: "https://github.com/mors6960/DwellPilot_LandingPage" }],
    problem:
      "Small UK letting agencies run rent, certificates and repairs across spreadsheets and inboxes. The marketing site had to explain a fairly deep product in seconds, stay honest about what is live, and still load fast on a phone.",
    approach: [
      "A scroll-driven intro that zooms into a lit window of a London terrace, then hands over to the product. Skipped automatically on return visits.",
      "A tabbed product showcase whose panels are real HTML, so search engines and screen readers get the content too.",
      "An MDX guides system where front matter drives metadata, canonical URLs, Article and Breadcrumb JSON-LD and the sitemap, and the build fails on bad dates or non-primary sources.",
    ],
    architecture: [
      { label: "Frontend", items: ["Next.js App Router", "React Server Components", "Tailwind v4 tokens, light and dark"] },
      { label: "Content", items: ["MDX + gray-matter", "Validated front matter", "Static generation"] },
      { label: "Platform", items: ["Route handler for walkthrough requests", "Server-only env module", "noindex for preview deploys"] },
    ],
    hardParts: [
      {
        title: "Smooth zoom without blur or jank",
        body: "The room behind the window is a separate clip-path layer rendered at screen resolution, and progress is eased in requestAnimationFrame so the camera never stutters.",
      },
    ],
    results: [
      { value: "100", label: "Lighthouse accessibility, best practices and SEO" },
      { value: "0", label: "Cumulative layout shift" },
    ],
  },
];

export const stack: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "Solidity", "Go (learning)"] },
  { group: "Backend", items: ["Node.js", "NestJS", "Express", "REST APIs", "Socket.IO", "JWT", "RBAC"] },
  { group: "Frontend & mobile", items: ["React", "Next.js", "Redux", "Capacitor", "Tailwind CSS"] },
  { group: "Data", items: ["PostgreSQL", "MongoDB", "MySQL", "Supabase"] },
  { group: "Web3", items: ["Ethereum", "Smart contracts", "ERC-721", "Multi-chain", "Wallets"] },
  { group: "Cloud & DevOps", items: ["AWS (EC2, S3, Lambda)", "Docker", "GitHub Actions", "Vercel", "Railway"] },
  { group: "Payments", items: ["Stripe", "RevenueCat", "Webhooks"] },
  { group: "Testing & tools", items: ["Jest", "Mocha", "Postman", "Cursor", "Claude Code"] },
];

/** Placeholders still present, listed in the dev terminal so nothing ships unfinished. */
export function findPlaceholders(): string[] {
  const hits = new Set<string>();
  const walk = (v: unknown, path: string) => {
    if (typeof v === "string") {
      for (const m of v.match(/\[[^\]]+\]/g) ?? []) hits.add(`${path}: ${m}`);
    } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`));
    else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, path ? `${path}.${k}` : k);
  };
  walk({ profile, about, experience, projects, stack }, "");
  return [...hits];
}

export const isPlaceholder = (s: string) => /^\[.*\]$/.test(s.trim());
