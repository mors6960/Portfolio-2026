import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { profile, projects } from "@/lib/content";
import { T } from "@/components/t";
import { GithubIcon } from "@/components/icons";
import { Magnetic } from "@/components/magnetic";
import { TechPill } from "@/components/tech-pill";
import { ProjectCover } from "@/components/project-cover";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  const description = p.oneLiner;
  return {
    title: `${p.title} case study`,
    description,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { type: "article", url: `/work/${p.slug}`, title: `${p.title} · case study`, description },
    twitter: { card: "summary_large_image", title: `${p.title} · case study`, description },
  };
}

/** Recruiter-first case study: problem → approach → architecture → hard parts → results. */
export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  return (
    <main id="content" className="relative z-10 mx-auto max-w-[860px] px-6 py-14 sm:px-10 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: profile.name, item: profile.siteUrl },
              { "@type": "ListItem", position: 2, name: p.title, item: `${profile.siteUrl.replace(/\/$/, "")}/work/${p.slug}` },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <a href="/#work" className="inline-flex min-h-11 items-center gap-2 text-[14px] font-medium text-body hover:text-ink">
        <ArrowLeft aria-hidden className="size-4" /> All work
      </a>

      <p className="mt-8 text-[12.5px] font-semibold tracking-[0.16em] text-muted uppercase">
        Case study · <T>{p.year}</T>
        {p.context ? <> · <T>{p.context}</T></> : null}
      </p>
      <h1 className="mt-3 text-[clamp(2.4rem,1.6rem+3vw,3.6rem)] leading-[1] font-semibold tracking-[-0.04em] text-ink">
        <T>{p.title}</T>
      </h1>
      <p className="mt-5 max-w-[40rem] text-[19px] leading-8 text-body">
        <T>{p.oneLiner}</T>
      </p>

      <div className="cover-live mt-8 overflow-hidden rounded-[20px] border border-line shadow-float">
        <ProjectCover slug={p.slug} image={p.cover} alt={`${p.title} screenshot`} />
      </div>

      <dl className="mt-8 grid gap-6 border-y border-line py-6 sm:grid-cols-3">
        <div>
          <dt className="text-[12px] font-semibold tracking-[0.12em] text-muted uppercase">Role</dt>
          <dd className="mt-1.5 text-[15px] text-ink"><T>{p.role}</T></dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-[12px] font-semibold tracking-[0.12em] text-muted uppercase">Stack</dt>
          <dd className="mt-1.5 flex flex-wrap gap-1.5">
            {p.tech.map((t, i) => (
              <TechPill key={`${t}-${i}`} label={t} />
            ))}
          </dd>
        </div>
      </dl>

      {p.links?.length ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {p.links.map((l, k) => (
            <Magnetic key={l.url}>
              <a
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className={
                  k === 0
                    ? "inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[14.5px] font-semibold text-bg"
                    : "inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[14.5px] font-medium text-ink"
                }
              >
                {/github\.com/.test(l.url) ? <GithubIcon className="size-4" /> : null}
                {l.label}
                <ArrowUpRight aria-hidden className="size-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Magnetic>
          ))}
        </div>
      ) : null}

      {/* Results first: hiring managers skim */}
      <section aria-labelledby="results-h" className="mt-14">
        <h2 id="results-h" className="sr-only">Results</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {p.results.map((r, i) => (
            <li key={`${r.label}-${i}`} className="rounded-[18px] border border-line bg-surface p-5">
              <p className="text-[40px] leading-none font-semibold tracking-[-0.04em] text-ink tabular"><T>{r.value}</T></p>
              <p className="mt-2 text-[14px] leading-5 text-muted"><T>{r.label}</T></p>
            </li>
          ))}
        </ul>
      </section>

      <Block n="01" title="The problem">
        <p><T>{p.problem}</T></p>
      </Block>

      <Block n="02" title="What I built">
        <ul className="grid gap-3">
          {p.approach.map((a, k) => (
            <li key={k} className="flex gap-3">
              <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-bright" />
              <span><T>{a}</T></span>
            </li>
          ))}
        </ul>
      </Block>

      <Block n="03" title="Architecture">
        <ol className="grid gap-3 sm:grid-cols-3" aria-label="Layers, from the user inward">
          {p.architecture.map((layer, k) => (
            <li key={layer.label} className="relative rounded-[16px] border border-line bg-surface p-4">
              <p className="font-mono text-[11.5px] tracking-[0.08em] text-accent uppercase">
                {String(k + 1).padStart(2, "0")} · {layer.label}
              </p>
              <ul className="mt-2 grid gap-1 text-[14px] leading-5 text-ink">
                {layer.items.map((it, i) => <li key={`${it}-${i}`}><T>{it}</T></li>)}
              </ul>
            </li>
          ))}
        </ol>
      </Block>

      <Block n="04" title="Hard parts">
        <div className="grid gap-6">
          {p.hardParts.map((h, i) => (
            <div key={`${h.title}-${i}`}>
              <h3 className="text-[17px] font-semibold text-ink"><T>{h.title}</T></h3>
              <p className="mt-1.5"><T>{h.body}</T></p>
            </div>
          ))}
        </div>
      </Block>

      <nav aria-label="More work" className="mt-20 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <a href={`/work/${next.slug}`} className="group">
          <span className="block text-[12.5px] font-semibold tracking-[0.14em] text-muted uppercase">Next case study</span>
          <span className="mt-1 inline-flex items-center gap-2 text-[22px] font-semibold tracking-tight text-ink">
            <T>{next.title}</T>
            <ArrowUpRight aria-hidden className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
        <a href={`mailto:${profile.email}`} className="text-[14.5px] font-medium text-body underline-offset-4 hover:text-ink hover:underline">
          Want something like this? Email me
        </a>
      </nav>
    </main>
  );
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-16 grid gap-4 sm:grid-cols-[9rem_1fr] sm:gap-8">
      <h2 className="text-[13px] font-semibold tracking-[0.14em] text-ink uppercase">
        <span className="font-mono text-accent">{n}</span> {title}
      </h2>
      <div className="text-[16.5px] leading-[1.75] text-body">{children}</div>
    </section>
  );
}
