"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * GlowingShadow — the brief referenced "@/components/ui/glowing-shadow" by its
 * demo only, so this is a compatible clean-room build: it wraps any content in
 * a soft, slowly rotating coloured glow that reads as cast light behind the
 * element. Used around the skills cards. Pauses off-screen and respects
 * reduced motion.
 */

export interface GlowingShadowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Corner radius in px (match the wrapped surface). */
  radius?: number;
  /** Seconds per rotation. */
  duration?: number;
}

export function GlowingShadow({
  children,
  radius = 18,
  duration = 7,
  className,
  style,
  ...props
}: GlowingShadowProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const cls = `gs-${uid}`;
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => setPaused(!entries.some((e) => e.isIntersecting)),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const css = `
.${cls} { position: relative; border-radius: ${radius}px; }
.${cls} > .gs-glow {
  position: absolute; inset: -2px; z-index: 0; border-radius: ${radius + 2}px;
  background: conic-gradient(from var(--gs-a, 0deg),
    #1f8fff, #22d3ee, #60a5fa, #3b82f6, #1f8fff);
  filter: blur(14px);
  opacity: 0.45;
  animation: ${cls}-spin ${duration}s linear infinite;
}
.${cls}[data-paused="true"] > .gs-glow { animation-play-state: paused; }
.${cls} > .gs-content { position: relative; z-index: 1; border-radius: ${radius}px; height: 100%; }
@keyframes ${cls}-spin { to { --gs-a: 360deg; } }
@property --gs-a { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
@media (prefers-reduced-motion: reduce) {
  .${cls} > .gs-glow { animation: none; --gs-a: 25deg; opacity: 0.35; }
}`.trim();

  return (
    <div
      ref={ref}
      data-paused={paused ? "true" : "false"}
      className={cn(cls, className)}
      style={{ borderRadius: `${radius}px`, ...style }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div aria-hidden="true" className="gs-glow" />
      <div className="gs-content">{children}</div>
    </div>
  );
}

export default GlowingShadow;
