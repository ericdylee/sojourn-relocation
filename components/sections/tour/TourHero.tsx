import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function TourHero() {
  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden">
      <Image
        src="/images/tour-busan.jpg"
        alt="Busan coastline at sunset"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/55 to-navy-950/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-28 sm:px-8 sm:py-32">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sunset-500 [text-shadow:0_1px_4px_rgba(8,22,45,0.8)] sm:text-sm">
            Private Tours · Since 2011
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_16px_rgba(8,22,45,0.55)] sm:text-6xl">
            Discover Busan &amp; Seoul, privately.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 [text-shadow:0_1px_8px_rgba(8,22,45,0.7)] sm:text-lg">
            English-speaking local guides, itineraries built around your
            schedule — half- and full-day tours for families, buyers, tourists
            and cruise guests.
          </p>
          <div className="mt-9">
            <Button href="#contact">Plan my tour</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
