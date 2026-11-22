import { GitCommitHorizontal } from "lucide-react";

type Event = { type: string; repo: { name: string }; created_at: string; payload?: { commits?: { message: string }[] } };

function ago(iso: string) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  const units: [number, string][] = [[86400 * 30, "month"], [86400 * 7, "week"], [86400, "day"], [3600, "hour"], [60, "minute"]];
  for (const [n, u] of units) if (s >= n) { const v = Math.floor(s / n); return `${v} ${u}${v > 1 ? "s" : ""} ago`; }
  return "just now";
}

/** Live-ish proof of work: the latest public push on GitHub, refreshed hourly. Hidden if GitHub is unreachable. */
export async function GithubActivity({ user }: { user: string }) {
  let latest: Event | undefined;
  try {
    const res = await fetch(`https://api.github.com/users/${user}/events/public?per_page=30`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) latest = ((await res.json()) as Event[]).find((e) => e.type === "PushEvent");
  } catch {}
  if (!latest) return null;
  const repo = latest.repo.name.split("/")[1];
  const msg = latest.payload?.commits?.at(-1)?.message.split("\n")[0];
  return (
    <a
      href={`https://github.com/${latest.repo.name}`}
      target="_blank"
      rel="noreferrer"
      className="group mt-6 flex max-w-[22rem] short:mt-4 tiny:hidden items-start gap-3 rounded-[14px] border border-line p-3 text-[13px] transition-colors hover:border-line-strong"
    >
      <GitCommitHorizontal aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
      <span className="min-w-0">
        <span className="block text-muted">
          Latest push · {ago(latest.created_at)}
        </span>
        <span className="block truncate font-medium text-ink">
          {repo}
          {msg ? <span className="font-normal text-body">: {msg}</span> : null}
        </span>
      </span>
    </a>
  );
}
