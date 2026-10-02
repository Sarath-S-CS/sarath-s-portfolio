"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * LiquidMetalButton — the brief referenced "@/components/ui/liquid-metal-button"
 * by its demo only, so this is a compatible clean-room build: a brushed-metal
 * pill with a specular highlight that sweeps across on hover. Works as a button
 * or, with `href`, as a link. `viewMode="icon"` renders a compact arrow puck.
 */

export interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  viewMode?: "default" | "icon";
  /** Render as a link instead of a button. */
  href?: string;
  /** "steel" is neutral; "azure" leans into the electric-blue accent. */
  tone?: "steel" | "azure";
}

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M3 8h9M8.5 3.5 13 8l-4.5 4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function LiquidMetalButton({
  label = "Get Started",
  viewMode = "default",
  href,
  tone = "steel",
  className,
  children,
  ...props
}: LiquidMetalButtonProps) {
  const isIcon = viewMode === "icon";

  const base = cn(
    "liquid-metal group relative inline-flex items-center justify-center overflow-hidden",
    "font-display text-sm font-semibold tracking-tight text-white",
    "transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.98]",
    isIcon ? "h-12 w-12 rounded-full" : "h-12 gap-2 rounded-full px-7",
    tone === "azure" ? "liquid-metal--azure" : "liquid-metal--steel",
    className,
  );

  const content = (
    <>
      {/* The moving specular sheen. */}
      <span aria-hidden="true" className="liquid-metal__sheen" />
      <span className="relative z-10 inline-flex items-center gap-2">
        {isIcon ? (
          <ArrowIcon />
        ) : (
          <>
            {children ?? label}
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowIcon />
            </span>
          </>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={base} aria-label={isIcon ? label : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={base} aria-label={isIcon ? label : undefined} {...props}>
      {content}
    </button>
  );
}

export default LiquidMetalButton;
