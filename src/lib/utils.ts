import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind class names, letting later/consumer classes win on conflict.
// Used by every shadcn-style component in this project.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
