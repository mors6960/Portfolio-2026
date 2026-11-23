import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { preloadScript } from "@/lib/site-script";
import { profile, projects } from "@/lib/content";
import { Spotlight } from "@/components/spotlight";
import { CommandMenuLoader } from "@/components/command-menu-loader";
import { sections } from "@/lib/sections";

const title = `${profile.name} · ${profile.role}`;
const description = `${profile.name}, ${profile.role.toLowerCase()} (${profile.focus}) in ${profile.location}. Payment gateways, real-time backends, Web3 and mobile apps.`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  openGraph: { type: "profile", url: "/", title, description, siteName: profile.name, locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0eee9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0f13" },
  ],
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.siteUrl,
  ...(profile.photo ? { image: `${profile.siteUrl}${profile.photo}` } : {}),
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  worksFor: { "@type": "Organization", name: "Antier Solutions" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Chitkara University" },
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: ["Node.js", "NestJS", "TypeScript", "PostgreSQL", "MongoDB", "Socket.IO", "Solidity", "Ethereum", "React", "Next.js", "AWS"],
};

const siteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: profile.name,
  alternateName: `${profile.name} Portfolio`,
  url: profile.siteUrl,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        {/* suppressHydrationWarning: some browser extensions rewrite <head> scripts before React loads */}
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: preloadScript }} />
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }}
        />
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="grain" suppressHydrationWarning>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Spotlight />
        {children}
        <CommandMenuLoader
          data={{
            sections,
            projects: projects.map((p) => ({ slug: p.slug, title: p.title })),
            email: profile.email,
            github: profile.github,
            linkedin: profile.linkedin,
            resumeUrl: profile.resumeUrl,
          }}
        />
      </body>
    </html>
  );
}
