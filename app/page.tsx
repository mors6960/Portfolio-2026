import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, FileText, MapPin } from "lucide-react";
import { about, experience, findPlaceholders, profile, projects, stack } from "@/lib/content";
import { sections } from "@/lib/sections";
import { XrayDemo } from "@/components/xray-demo";
import { Controls, SideNav } from "@/components/sidebar";
import { Magnetic } from "@/components/magnetic";
import { CopyEmail } from "@/components/copy-email";
import { GithubActivity } from "@/components/github-activity";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { T } from "@/components/t";
import { TechPill } from "@/components/tech-pill";
import { ProjectCover } from "@/components/project-cover";
import { StackScene } from "@/components/stack-scene";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export const revalidate = 3600;

if (process.env.NODE_ENV !== "production") {
  const left = findPlaceholders();
  if (left.length) console.info(`\n[portfolio] ${left.length} placeholders left in lib/content.ts:\n  ${left.join("\n  ")}\n`);
}

export default function Home() {
  return (
    <div className="relative z-10 mx-auto min-h-dvh max-w-[1180px] px-6 sm:px-10 lg:flex lg:gap-16 lg:px-14">
      {/* ── Left: sticky identity column ───────────────────────────── */}
      <header className="pt-14 pb-10 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-[44%] lg:flex-col lg:justify-between lg:overflow-y-auto lg:py-20 lg:[scrollbar-width:none] short:py-10 tiny:py-6">
        <div>
          <div className="mb-6 flex items-center gap-3 short:mb-4">
            {profile.photo ? (
              <Image
                src={profile.photo}
                alt={profile.name}
                width={56}
                height={56}
                priority
                className="size-14 rounded-full object-cover ring-2 ring-surface shadow-float tiny:size-11"
              />
            ) : null}
            {profile.availability ? (
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 text-[12.5px] text-body">
                <span className="relative flex size-2" aria-hidden>
                  <span className="absolute inline-flex size-full rounded-full bg-ok opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-ok" />
                </span>
                {profile.availability}
              </p>
            ) : null}
          </div>
          <h1 className="text-[clamp(2.6rem,1.6rem+3.6vw,3.9rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-ink lg:text-[clamp(2.6rem,1rem+2.7vw,3.7rem)] short:text-[clamp(2.4rem,0.8rem+2.4vw,3.2rem)]">
            {profile.name}
          </h1>
          <p className="mt-3 text-[clamp(1.3rem,1rem+1vw,1.7rem)] leading-tight text-ink short:mt-2 short:text-[1.35rem]">
            <span className="font-serif italic">Full-stack</span> developer
          </p>
          <p className="mt-2 font-mono text-[13px] tracking-wide text-accent">{profile.focus}</p>
          <p className="mt-5 max-w-[24rem] text-[16.5px] leading-7 text-body short:mt-3 short:text-[15.5px] short:leading-6">{profile.tagline}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-[14px] text-muted short:mt-2">
            <MapPin aria-hidden className="size-4" /> {profile.location}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 short:mt-5">
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex h-12 tiny:h-11 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-semibold text-bg"
              >
                See my work
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <CopyEmail
                email={profile.email}
                className="inline-flex h-12 tiny:h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[15px] font-medium text-ink transition-colors hover:bg-surface"
              />
            </Magnetic>
          </div>

          <SideNav sections={sections} />
        </div>

        <div className="mt-10 lg:mt-8 short:mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <Controls />
            <a href={profile.github} target="_blank" rel="noreferrer me" className="grid size-11 place-items-center rounded-full text-body hover:text-ink">
              <GithubIcon className="size-5" />
              <span className="sr-only">GitHub (opens in a new tab)</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer me" className="grid size-11 place-items-center rounded-full text-body hover:text-ink">
              <LinkedinIcon className="size-5" />
              <span className="sr-only">LinkedIn (opens in a new tab)</span>
            </a>
          </div>
          <GithubActivity user={profile.githubUser} />
        </div>
      </header>

      {/* ── Right: scrolling content ───────────────────────────────── */}
      <main id="content" className="pb-24 lg:w-[56%] lg:py-20">
        <section id="hero" aria-labelledby="hero-h" className="scroll-mt-8">
          <h2 id="hero-h" className="mb-4 text-[15px] leading-6 text-body">
            <span className="text-ink">This is a real app.</span>{" "}
            <span className="hidden pointer-fine:inline">
              <span className="font-serif text-[18px] italic text-ink">Hover it</span> to see the backend underneath,
            </span>
            <span className="pointer-fine:hidden">
              Tap <span className="font-serif text-[18px] italic text-ink">Backend</span> to see what serves it,
            </span>{" "}
            or use it and watch the API respond.
          </h2>
          <XrayDemo />
        </section>

        <section aria-labelledby="flow-h" className="mt-24 lg:mt-28">
          <h2 id="flow-h" className="mb-2 text-[12.5px] font-semibold tracking-[0.16em] text-ink uppercase">How I build</h2>
          <p className="mb-8 max-w-[30rem] text-[15.5px] leading-6 text-body">
            Every product I ship runs through the same five layers. Scroll to take a request from the screen down to the chain.
          </p>
          <StackScene />
        </section>

        <Section id="about" title="About">
          <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_11rem] sm:items-start">
            <div className="grid gap-4 text-[16.5px] leading-[1.75]">
              {about.map((p, i) => (
                <p key={i}>
                  <T>{p}</T>
                </p>
              ))}
            </div>
            {profile.photo ? (
              <figure className="order-first w-40 rotate-[-3deg] rounded-[20px] border border-line bg-surface p-2 shadow-float transition-transform duration-300 hover:rotate-0 sm:order-none sm:w-auto">
                <Image
                  src={profile.photo}
                  alt={`${profile.name} at his desk`}
                  width={352}
                  height={352}
                  sizes="(min-width: 640px) 176px, 160px"
                  className="aspect-square w-full rounded-[14px] object-cover grayscale-[25%] transition-[filter] duration-300 hover:grayscale-0"
                />
                <figcaption className="px-1 pt-2 pb-0.5 font-mono text-[11px] text-muted">{profile.location}</figcaption>
              </figure>
            ) : null}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <ol className="group/list grid gap-3">
            {experience.map((e, i) => (
              <li
                key={i}
                className="grid gap-2 rounded-[16px] p-4 transition-all sm:grid-cols-[8rem_1fr] sm:gap-6 lg:-mx-4 lg:hover:bg-surface lg:hover:shadow-float lg:group-hover/list:opacity-55 lg:hover:!opacity-100"
              >
                <p className="pt-0.5 text-[12.5px] font-semibold tracking-[0.06em] text-muted uppercase tabular">
                  <T>{e.period}</T>
                </p>
                <div>
                  <h3 className="text-[16.5px] leading-snug font-semibold text-ink">
                    <T>{e.role}</T> · <T>{e.company}</T>
                  </h3>
                  <p className="mt-2 text-[15px] leading-6.5">
                    <T>{e.summary}</T>
                  </p>
                  <Pills items={e.tech} />
                </div>
              </li>
            ))}
          </ol>
          {profile.resumeUrl ? (
            <a href={profile.resumeUrl} className="mt-8 inline-flex items-center gap-2 font-semibold text-ink underline-offset-4 hover:underline">
              <FileText aria-hidden className="size-4" /> View full résumé
            </a>
          ) : null}
        </Section>

        <Section id="work" title="Selected work">
          <ul className="grid gap-5">
            {projects.map((p) => (
              <li key={p.slug}>
                <a
                  href={`/work/${p.slug}`}
                  className={`group relative block overflow-hidden rounded-[20px] border border-line p-6 transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-float ${
                    p.featured ? "bg-surface" : "bg-surface/50"
                  }`}
                >
                  <div className="-mx-6 -mt-6 mb-5 overflow-hidden border-b border-line [contain-intrinsic-size:auto_220px] [content-visibility:auto]">
                    <ProjectCover slug={p.slug} image={p.cover} alt={`${p.title} screenshot`} />
                  </div>
                  {p.ribbon ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute z-10 top-[30px] -right-[50px] w-[200px] rotate-45 bg-[#0b6a62] py-1.5 text-center text-[10px] font-bold tracking-[0.08em] text-white uppercase shadow-[0_6px_16px_-6px_rgb(0_0_0/.35)]"
                    >
                      {p.ribbon}
                    </span>
                  ) : null}
                  {p.featured ? (
                    <span className="mb-3 inline-block rounded-full bg-accent-soft px-2.5 py-0.5 text-[12px] font-semibold text-accent">
                      Featured case study
                    </span>
                  ) : null}
                  {p.context ? (
                    <p className="mb-1 text-[12.5px] font-medium tracking-[0.04em] text-muted">
                      <T>{p.context}</T>
                    </p>
                  ) : null}
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[22px] leading-tight font-semibold tracking-tight text-ink">
                      <T>{p.title}</T>
                    </h3>
                    <span className="shrink-0 text-[13px] text-muted tabular">
                      <T>{p.year}</T>
                    </span>
                  </div>
                  <p className="mt-2 text-[15.5px] leading-6.5">
                    <T>{p.oneLiner}</T>
                  </p>
                  <Pills items={p.tech} />
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink">
                    Read the case study
                    <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="stack" title="Stack">
          <dl className="grid gap-6 sm:grid-cols-2">
            {stack.map((g) => (
              <div key={g.group}>
                <dt className="text-[12.5px] font-semibold tracking-[0.12em] text-muted uppercase">{g.group}</dt>
                <dd>
                  <Pills items={g.items} />
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="contact" title="Contact">
          <p className="text-[clamp(2rem,1.4rem+2.4vw,3.2rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-ink">
            Have something to build? <span className="font-serif font-normal italic text-accent">Let&apos;s talk.</span>
          </p>
          <p className="mt-4 max-w-[30rem] text-[16px] leading-7">
            I reply to every message. The fastest way is email; LinkedIn works too.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-semibold text-bg"
              >
                <T>{profile.email}</T>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-5 text-[15px] font-medium text-ink hover:bg-surface"
              >
                <LinkedinIcon className="size-4" /> LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Magnetic>
          </div>
        </Section>

        <footer className="mt-24 border-t border-line pt-6 text-[13px] leading-6 text-muted">
          Designed and built by {profile.name} with Next.js and Tailwind CSS. Press{" "}
          <kbd className="rounded border border-line bg-surface-2 px-1 font-mono text-[11px]">⌘K</kbd> anywhere.
        </footer>
      </main>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mt-24 scroll-mt-8 lg:mt-32">
      <h2
        id={`${id}-h`}
        className="sticky top-0 z-20 -mx-6 mb-6 bg-bg/80 px-6 py-4 text-[12.5px] font-semibold tracking-[0.16em] text-ink uppercase backdrop-blur sm:-mx-10 sm:px-10 lg:static lg:mx-0 lg:mb-8 lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Pills({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
      {items.map((t, i) => (
        <li key={`${t}-${i}`}>
          <TechPill label={t} />
        </li>
      ))}
    </ul>
  );
}
