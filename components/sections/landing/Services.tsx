import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { services } from "@/lib/content/services";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 h-4 w-4 shrink-0 text-steel-500"
      aria-hidden="true"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

export function Services() {
  return (
    <Section id="services">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
          What we handle
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl">
          Everything your relocation needs — in one team.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-navy-900/70 sm:text-lg">
          From the first visa document to the keys in your hand, one
          dedicated team carries every step — so nothing falls between the
          cracks.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
        {services.map((service) => {
          const isTour = service.id === "tour";
          const href = isTour ? "/tour" : "#contact";

          return (
            <Link
              key={service.id}
              href={href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-500"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand-50">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-navy-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                  {service.summary}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-navy-900/80">
                      <CheckIcon />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                {isTour ? (
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-steel-500 transition-colors group-hover:text-navy-900">
                    Explore private tours
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                ) : (
                  <span className="mt-6 text-sm font-semibold text-navy-900/40">
                    Ask us about this
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
