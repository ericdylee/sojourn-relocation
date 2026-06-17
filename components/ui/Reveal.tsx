"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Phase = "idle" | "hidden" | "shown";

/**
 * Fades and lifts its children into view the first time they enter the
 * viewport. SSR, no-JS and `prefers-reduced-motion` users always see the
 * content immediately — the animation is only ever *added* on top once the
 * client confirms motion is welcome, so nothing is hidden behind JS.
 *
 * Content already on screen at load stays in the `idle` phase (no animation),
 * which also avoids hiding-then-revealing the first sections.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let observer: IntersectionObserver | null = null;

    // Defer arming until after the first paint so state never changes
    // synchronously inside the effect body.
    const raf = requestAnimationFrame(() => {
      if (el.getBoundingClientRect().top < window.innerHeight) return;

      setPhase("hidden");
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPhase("shown");
            observer?.disconnect();
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
      );
      observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, []);

  const motion =
    phase === "idle"
      ? ""
      : `transition-[opacity,transform] duration-700 ease-out ${
          phase === "shown"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`;

  return (
    <div ref={ref} className={`${motion} ${className}`.trim()}>
      {children}
    </div>
  );
}
