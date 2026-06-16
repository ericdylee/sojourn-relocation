import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

const thumbnails = [
  {
    src: "/images/gamcheon.jpg",
    alt: "Colorful hillside houses at Gamcheon Culture Village, Busan",
    caption: "Gamcheon Culture Village",
  },
  {
    src: "/images/haeundae.jpg",
    alt: "Haeundae Beach and the Busan coastline",
    caption: "Haeundae",
  },
  {
    src: "/images/gyeongbokgung.jpg",
    alt: "Geunjeongjeon Hall at Gyeongbokgung Palace, Seoul",
    caption: "Gyeongbokgung",
  },
];

export function TourTeaser() {
  return (
    <Section id="tour" tone="sand">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sunset-500">
            Beyond relocation
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl">
            Discover Busan &amp; Seoul, privately.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-900/70 sm:text-lg">
            English-speaking guides for families, buyers and cruise guests —
            half- and full-day private tours, tailored to your schedule.
          </p>
        </div>

        <Button href="/tour" className="shrink-0">
          Explore private tours
        </Button>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {thumbnails.map((thumb) => (
          <figure key={thumb.src} className="overflow-hidden">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src={thumb.src}
                alt={thumb.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm font-semibold text-navy-900/80">
              {thumb.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
