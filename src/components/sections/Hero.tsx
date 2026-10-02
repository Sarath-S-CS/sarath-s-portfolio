import { WavyBackground } from "@/components/ui/wavy-background";
import { profile } from "@/data/content";

// Hero: animated canvas waves (electric blues on deep navy) behind a bold
// name, title, tagline and two CTAs. The buttons jump to the Projects and
// Contact sections.
export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative">
      <WavyBackground
        containerClassName="relative h-[100svh] min-h-[560px] overflow-hidden"
        className="relative mx-auto flex max-w-4xl flex-col items-center px-5 text-center"
        colors={["#1f8fff", "#0ea5e9", "#22d3ee", "#60a5fa", "#2563eb"]}
        backgroundFill="#060b18"
        waveOpacity={0.4}
        blur={10}
        speed="slow"
      >
        {/* Soft navy backdrop so text stays legible over any wave position. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 50%, hsl(222 56% 6% / 0.82) 0%, hsl(222 56% 6% / 0.5) 45%, transparent 75%)",
          }}
        />
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          Open to roles · {profile.location}
        </p>

        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground glow-text sm:text-6xl md:text-7xl">
          {profile.name}
        </h1>

        <p className="mt-4 font-display text-xl font-medium text-primary sm:text-2xl">
          {profile.title}
        </p>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.tagline}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#projects"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-6px_hsl(var(--primary))] transition-transform duration-200 hover:scale-[1.03] hover:bg-primary/90"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background/30 px-7 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            Get in touch
          </a>
        </div>
      </WavyBackground>
    </section>
  );
}
