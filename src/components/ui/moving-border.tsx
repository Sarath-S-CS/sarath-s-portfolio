"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * Moving Border — the brief referenced "@/components/ui/moving-border" by its
 * demo only. The well-known version depends on framer-motion; this is a
 * compatible clean-room build with no extra dependencies. A glowing dot travels
 * the rounded-rectangle border (via the SVG rect's getPointAtLength), driven by
 * requestAnimationFrame and written straight to the dot's transform so the
 * surrounding React tree never re-renders. Pauses off-screen; respects
 * reduced motion.
 *
 * Same API as the demo: <Button borderRadius="1.75rem" className="...">…</Button>
 * with an optional `as` (default "button") so it can wrap non-interactive
 * content as a <div>.
 */

interface ButtonProps {
  borderRadius?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: ButtonProps) {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName,
      )}
      style={{ borderRadius }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-24 w-24 opacity-80",
              "bg-[radial-gradient(#22d3ee_35%,transparent_60%)]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/80 text-sm text-white antialiased backdrop-blur-xl",
          className,
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
}

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}

const MovingBorder = ({ children, duration = 3000, rx, ry }: MovingBorderProps) => {
  const rectRef = React.useRef<SVGRectElement>(null);
  const dotRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const rect = rectRef.current;
    const dot = dotRef.current;
    if (!rect || !dot || typeof rect.getTotalLength !== "function") return;

    const place = (dist: number) => {
      const len = rect.getTotalLength();
      if (!len) return;
      const p = rect.getPointAtLength(dist % len);
      dot.style.transform = `translateX(${p.x}px) translateY(${p.y}px) translate(-50%, -50%)`;
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Park the light on an edge rather than animating.
      const len = rect.getTotalLength();
      if (len) place(len * 0.12);
      return;
    }

    let raf = 0;
    let visible = true;
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              visible = entries.some((e) => e.isIntersecting);
            },
            { threshold: 0.01 },
          )
        : null;
    io?.observe(rect);

    const frame = (t: number) => {
      const len = rect.getTotalLength();
      if (len && visible) place(((t / duration) * len) % len);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [duration]);

  return (
    <>
      <svg
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          ref={rectRef}
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
        />
      </svg>
      <div
        ref={dotRef}
        style={{ position: "absolute", top: 0, left: 0, display: "inline-block" }}
      >
        {children}
      </div>
    </>
  );
};

export default Button;
