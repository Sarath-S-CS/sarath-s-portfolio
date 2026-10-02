"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * BorderBeam — a rounded, dark panel with a light that travels its border.
 *
 * NOTE: the original `border-beam.tsx` was not included in the brief (only its
 * usage was), so this is a compatible clean-room implementation offering the
 * same wrapper API used there: <BorderBeam size="md" colorVariant="colorful">.
 * The moving light is a rotating conic gradient masked to the border ring, the
 * same technique as border-beam-panel; it pauses when off-screen and respects
 * reduced-motion.
 */

type Size = "sm" | "md" | "lg";
type ColorVariant = "colorful" | "blue" | "mono";

const SIZE: Record<Size, { padding: number; radius: number; blur: number }> = {
  sm: { padding: 16, radius: 20, blur: 12 },
  md: { padding: 24, radius: 24, blur: 16 },
  lg: { padding: 32, radius: 28, blur: 20 },
};

const VARIANT: Record<ColorVariant, string[]> = {
  // Electric-blue → cyan sweep, matching this site's accents.
  colorful: ["#1f8fff", "#22d3ee", "#60a5fa", "#38bdf8"],
  blue: ["#1f8fff", "#1f8fff"],
  mono: ["#64748b", "#cbd5e1"],
};

export interface BorderBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  size?: Size;
  colorVariant?: ColorVariant;
  /** Seconds per full lap. */
  duration?: number;
  /** Border ring thickness in px. */
  thickness?: number;
}

export function BorderBeam({
  children,
  size = "md",
  colorVariant = "colorful",
  duration = 6,
  thickness = 2,
  className,
  style,
  ...props
}: BorderBeamProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const cls = `bb-${uid}`;
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const { padding, radius, blur } = SIZE[size];

  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => setPaused(!entries.some((e) => e.isIntersecting)),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stops = VARIANT[colorVariant];
  // A bright arc of the beam colors followed by a long transparent tail.
  const arc = stops
    .map((c, i) => `${c} ${6 + (i * 14) / Math.max(1, stops.length - 1)}deg`)
    .join(", ");
  const gradient = `conic-gradient(from var(--bb-a, 0deg), transparent 0deg, ${arc}, transparent 26deg, transparent 360deg)`;

  const css = `
.${cls} { position: relative; isolation: isolate; border-radius: ${radius}px; }
.${cls} .bb-ring, .${cls} .bb-glow {
  position: absolute; inset: -1px; border-radius: ${radius}px;
  pointer-events: none; background: ${gradient};
}
.${cls} .bb-ring {
  padding: ${Math.max(1, thickness)}px;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
}
.${cls} .bb-glow { filter: blur(${blur}px); opacity: 0.4; z-index: -1; }
.${cls} .bb-ring, .${cls} .bb-glow { animation: ${cls}-spin ${duration}s linear infinite; }
.${cls}[data-paused="true"] .bb-ring, .${cls}[data-paused="true"] .bb-glow { animation-play-state: paused; }
@keyframes ${cls}-spin { to { --bb-a: 360deg; } }
@property --bb-a { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
@media (prefers-reduced-motion: reduce) {
  .${cls} .bb-ring, .${cls} .bb-glow { animation: none; --bb-a: 40deg; }
}
@media (forced-colors: active) {
  .${cls} .bb-ring, .${cls} .bb-glow { display: none; }
}`.trim();

  return (
    <div
      ref={rootRef}
      data-paused={paused ? "true" : "false"}
      className={cn("w-full bg-[#0d0d0f]", cls, className)}
      style={{ borderRadius: `${radius}px`, padding, ...style }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div aria-hidden="true" className="bb-glow" />
      <div aria-hidden="true" className="bb-ring" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default BorderBeam;
