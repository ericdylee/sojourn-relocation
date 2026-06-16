"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_FRAME_COUNT } from "@/lib/hero/frames";
import { frameForProgress } from "@/lib/hero/frame-map";

const SCRUB_QUERY = "(min-width: 768px) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function frameSrc(index: number): string {
  const num = String(index + 1).padStart(4, "0");
  return `/hero/frames/frame_${num}.webp`;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

interface UseScrollFramesResult {
  /** Ref to attach to the tall scroll wrapper that drives progress. */
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  /** Ref to attach to the canvas that frames are drawn onto. */
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  /** True once we've determined the client supports scroll-scrubbing and the first frame is ready. */
  scrubReady: boolean;
  /** True if this client should use the canvas scroll-scrub experience at all (desktop + motion ok). */
  scrubSupported: boolean;
  /** Current scroll progress through the wrapper, 0..1. Only meaningful when scrubSupported. */
  progress: number;
}

/**
 * Owns capability detection, frame preloading, scroll-driven progress tracking,
 * and canvas drawing for the scroll-scrub hero. Client-only: all capability
 * checks happen inside effects so the server-rendered markup never branches
 * on window/matchMedia and hydration stays stable.
 */
export function useScrollFrames(): UseScrollFramesResult {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [scrubSupported, setScrubSupported] = useState(false);
  const [frame0Loaded, setFrame0Loaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Derived, not stored: "ready" only means anything once we know the client
  // supports scrubbing AND the first frame has actually loaded. Deriving this
  // avoids a second effect whose only job would be resetting state, which
  // triggers cascading-render lint warnings for no real benefit.
  const scrubReady = scrubSupported && frame0Loaded;

  // Capability detection: decide once on mount (and react to live changes,
  // e.g. rotating a tablet or toggling OS-level reduced-motion).
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const sizeQuery = window.matchMedia(SCRUB_QUERY);
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const evaluate = () => {
      setScrubSupported(sizeQuery.matches && !motionQuery.matches);
    };

    evaluate();
    sizeQuery.addEventListener("change", evaluate);
    motionQuery.addEventListener("change", evaluate);

    return () => {
      sizeQuery.removeEventListener("change", evaluate);
      motionQuery.removeEventListener("change", evaluate);
    };
  }, []);

  // Preload frames + drive the scroll/draw loop. Only runs once scrubbing is supported.
  useEffect(() => {
    if (!scrubSupported) return;

    let cancelled = false;
    const images: HTMLImageElement[] = new Array(HERO_FRAME_COUNT);
    const loaded: boolean[] = new Array(HERO_FRAME_COUNT).fill(false);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") ?? null;

    let currentIndex = -1;
    let rafId = 0;
    let drawScheduled = false;

    const drawIndex = (index: number) => {
      const img = images[index];
      if (!canvas || !ctx || !img || !loaded[index]) return;

      const dpr = window.devicePixelRatio || 1;
      const cssWidth = canvas.clientWidth || 1;
      const cssHeight = canvas.clientHeight || 1;
      const pixelWidth = Math.round(cssWidth * dpr);
      const pixelHeight = Math.round(cssHeight * dpr);

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      // Cover fit: center-crop the source image to fill the canvas box.
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const boxRatio = pixelWidth / pixelHeight;

      let sx = 0;
      let sy = 0;
      let sWidth = img.naturalWidth;
      let sHeight = img.naturalHeight;

      if (imgRatio > boxRatio) {
        // Image is wider than the box: crop left/right.
        sWidth = img.naturalHeight * boxRatio;
        sx = (img.naturalWidth - sWidth) / 2;
      } else {
        // Image is taller than the box: crop top/bottom.
        sHeight = img.naturalWidth / boxRatio;
        sy = (img.naturalHeight - sHeight) / 2;
      }

      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, pixelWidth, pixelHeight);
      currentIndex = index;
    };

    const scheduleDraw = (index: number) => {
      if (index === currentIndex || drawScheduled) return;
      drawScheduled = true;
      rafId = window.requestAnimationFrame(() => {
        drawScheduled = false;
        drawIndex(index);
      });
    };

    const computeProgress = (): number => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return 0;
      const rect = wrapper.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return 0;
      return clamp01(-rect.top / scrollable);
    };

    const onScroll = () => {
      const next = computeProgress();
      setProgress(next);
      scheduleDraw(frameForProgress(next, HERO_FRAME_COUNT));
    };

    const onResize = () => {
      onScroll();
      // Force a redraw at the current index since canvas size changed.
      currentIndex = -1;
      scheduleDraw(frameForProgress(computeProgress(), HERO_FRAME_COUNT));
    };

    // Preload all frames. Draw frame 0 the instant it's available so the
    // canvas is never blank, independent of preload order/speed.
    for (let i = 0; i < HERO_FRAME_COUNT; i += 1) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i);
      img.onload = () => {
        if (cancelled) return;
        loaded[i] = true;
        if (i === 0) {
          setFrame0Loaded(true);
          drawIndex(0);
        } else if (i === frameForProgress(computeProgress(), HERO_FRAME_COUNT)) {
          drawIndex(i);
        }
      };
      images[i] = img;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Defer the initial measurement to a microtask/rAF rather than calling
    // setState synchronously in the effect body (avoids cascading renders).
    const initialRafId = window.requestAnimationFrame(onScroll);

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(initialRafId);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [scrubSupported]);

  return { wrapperRef, canvasRef, scrubReady, scrubSupported, progress };
}
