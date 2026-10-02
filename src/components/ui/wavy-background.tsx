"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

/*
 * WavyBackground — animated flowing waves on a canvas.
 *
 * Adapted from the provided component for a cleaner, less "pixely" look:
 *  - the canvas is scaled by devicePixelRatio so lines stay crisp on hiDPI
 *    screens (the original drew at CSS pixels and let the browser upscale);
 *  - each frame fully clears instead of stacking translucent fills, which
 *    removes the smoky trail;
 *  - the waves are sampled more finely for smoother curves.
 */
export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 6,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const getSpeed = () => (speed === "fast" ? 0.0026 : 0.0014);
    const waveColors = colors ?? ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];

    let w = 0;
    let h = 0;
    let nt = 0;
    let animationId = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.filter = `blur(${blur}px)`;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
    };

    const drawWave = (n: number) => {
      nt += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 44;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        ctx.globalAlpha = waveOpacity;
        // Finer sampling (step 2) gives smoother curves than the original's 5.
        for (let x = 0; x <= w; x += 2) {
          const y = noise(x / 900, 0.28 * i, nt) * 90;
          if (x === 0) ctx.moveTo(x, y + h * 0.5);
          else ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const render = () => {
      // Clear fully each frame (no translucent stacking) for a clean look.
      ctx.save();
      ctx.filter = "none";
      ctx.globalAlpha = 1;
      ctx.fillStyle = backgroundFill || "#060b18";
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
      ctx.filter = `blur(${blur}px)`;
      drawWave(5);
      if (!reduce) animationId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    );
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName,
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
