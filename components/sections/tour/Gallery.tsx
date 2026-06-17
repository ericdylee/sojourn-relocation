import Image from "next/image";
import { Section } from "@/components/ui/Section";

const shots = [
  { src: "/images/tour-busan.jpg", alt: "Busan coastline at sunset", caption: "Busan coast" },
  { src: "/images/gamcheon.jpg", alt: "Colorful hillside houses at Gamcheon Culture Village, Busan", caption: "Gamcheon Culture Village" },
  { src: "/images/jagalchi.jpg", alt: "Stalls at Jagalchi Fish Market, Busan", caption: "Jagalchi Market" },
  { src: "/images/haeundae.jpg", alt: "Haeundae Beach and the Busan skyline", caption: "Haeundae Beach" },
  { src: "/images/gyeongbokgung.jpg", alt: "Geunjeongjeon Hall at Gyeongbokgung Palace, Seoul", caption: "Gyeongbokgung Palace" },
  { src: "/images/gwangjang.jpg", alt: "Street-food stalls at Gwangjang Market, Seoul", caption: "Gwangjang Market" },
];

export function Gallery() {
  return (
    <Section id="gallery">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sunset-500">
          A glimpse
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl">
          Places we&apos;ll take you.
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {shots.map((shot) => (
          <figure
            key={shot.src}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/10 to-transparent" />
            <figcaption className="absolute bottom-3 left-4 right-4 text-sm font-semibold text-white [text-shadow:0_1px_4px_rgba(8,22,45,0.8)]">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
