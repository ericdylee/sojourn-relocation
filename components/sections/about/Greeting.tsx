import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/lib/content/about";

function QuoteMark() {
  return (
    <svg
      viewBox="0 0 32 24"
      fill="currentColor"
      className="h-8 w-10 text-white/25"
      aria-hidden="true"
    >
      <path d="M9.5 0C4.3 2.9 0 8.6 0 14.9 0 20 3.3 24 8.1 24c4 0 6.9-3.1 6.9-6.9 0-3.6-2.6-6.2-6-6.2-.6 0-1.1.1-1.5.2C8.1 7.6 11 4 15.4 1.9L9.5 0Zm17.1 0C21.4 2.9 17 8.6 17 14.9c0 5.1 3.3 9.1 8.1 9.1 4 0 6.9-3.1 6.9-6.9 0-3.6-2.6-6.2-6-6.2-.6 0-1.1.1-1.5.2.5-3.5 3.4-7.1 7.8-9.2L26.6 0Z" />
    </svg>
  );
}

export function Greeting() {
  const { eyebrow, body, name, role } = about.greeting;

  return (
    <section id="founder" className="relative overflow-hidden py-20 sm:py-28">
      {/* Skyline backdrop with a deep navy scrim for legibility. */}
      <Image
        src="/images/founder-bg.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950/92 via-navy-900/85 to-navy-900/80" />

      <Container className="relative">
        <Reveal>
          <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            {/* Greeting */}
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-300">
                {eyebrow}
              </p>

              <QuoteMark />

              <blockquote className="mt-4 space-y-5 text-lg leading-relaxed text-white/85 sm:text-xl">
                {body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </blockquote>

              <figcaption className="mt-8">
                <span className="block text-base font-bold text-white">
                  {name}
                </span>
                <span className="block text-sm text-white/60">{role}</span>
              </figcaption>
            </div>

            {/* Portrait */}
            <div className="mx-auto w-full max-w-xs lg:max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-2xl shadow-navy-950/40">
                <Image
                  src="/images/rosh-yum.jpg"
                  alt="Rosh Yum, Founder & Representative of SOJOURN KOREA"
                  fill
                  sizes="(min-width: 1024px) 384px, 80vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
