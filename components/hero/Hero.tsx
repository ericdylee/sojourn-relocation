"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useScrollFrames } from "./useScrollFrames";

const FADE_END_PROGRESS = 0.4;

export function Hero() {
  const { wrapperRef, canvasRef, scrubReady, scrubSupported, progress } = useScrollFrames();

  // Fade/translate the overlay out over the first ~40% of scroll once scrubbing.
  const fade = scrubSupported ? Math.min(1, progress / FADE_END_PROGRESS) : 0;
  const overlayOpacity = 1 - fade;
  const overlayTranslate = fade * 24;

  return (
    <div
      ref={wrapperRef}
      className={scrubSupported ? "relative h-[280vh]" : "relative h-screen"}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Poster: always present so first paint is never empty. Hidden once
            the canvas has its first frame ready, or kept as the video poster.
            Wrapped in its own relative box because next/image "fill" needs a
            positioned ancestor, and the stage itself uses "sticky". */}
        <div className="absolute inset-0">
          <Image
            src="/hero/poster.jpg"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className={`object-cover transition-opacity duration-300 ${
              scrubReady ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>

        {/* Scroll-scrub canvas. Only meaningful on desktop + motion-ok clients;
            stays in the DOM always for hydration stability, just visually inert
            until JS confirms capability + the first frame has loaded. */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            scrubSupported && scrubReady ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Mobile / touch / reduced-motion fallback: autoplay loop video. */}
        <video
          src="/hero/haeundae.mp4"
          poster="/hero/poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            scrubSupported ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Dark navy gradient overlay for text legibility, layered for depth
            rather than a single flat scrim. */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/55 to-navy-950/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />

        {/* Content */}
        <div
          className="relative flex h-full flex-col items-start justify-center px-6 sm:px-10 lg:px-16"
          style={
            scrubSupported
              ? { opacity: overlayOpacity, transform: `translateY(-${overlayTranslate}px)` }
              : undefined
          }
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-steel-300 [text-shadow:0_1px_4px_rgba(8,22,45,0.8)] sm:text-sm">
              SOJOURN KOREA · SINCE 2011
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_16px_rgba(8,22,45,0.55)] sm:text-6xl lg:text-7xl">
              Your move to Korea, handled.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 [text-shadow:0_1px_8px_rgba(8,22,45,0.7)] sm:text-lg">
              Visa, housing, and settling-in — managed end to end, 1:1, by people
              who live here.
            </p>
            <div className="mt-9">
              <Button href="#contact">Request a consultation</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
