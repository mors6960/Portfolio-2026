export default function NotFound() {
  return (
    <main id="content" className="relative z-10 mx-auto grid min-h-dvh max-w-[640px] content-center px-6">
      <p className="font-mono text-[13px] text-accent">GET {"<this page>"} → 404</p>
      <h1 className="mt-3 text-[clamp(2.2rem,1.6rem+2.4vw,3.2rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-ink">
        No route matched. <span className="font-serif font-normal italic">Even the backend checked.</span>
      </h1>
      <a href="/" className="mt-8 inline-flex h-12 w-fit items-center rounded-full bg-ink px-6 text-[15px] font-semibold text-bg">
        Back to the homepage
      </a>
    </main>
  );
}
