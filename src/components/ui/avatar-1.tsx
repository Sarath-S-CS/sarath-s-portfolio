"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * Minimal shadcn-style avatar (the brief referenced "@/components/ui/avatar-1").
 * Used in the header for the "SS" monogram.
 */

export const Avatar = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "relative inline-flex h-9 w-9 shrink-0 select-none items-center justify-center overflow-hidden rounded-xl",
      className,
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

export const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-xl",
      "bg-gradient-to-br from-primary to-accent font-display text-sm font-bold tracking-tight text-primary-foreground",
      "ring-1 ring-inset ring-white/20",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";
