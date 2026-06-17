import { Section } from "@/components/ui/Section";
import { about } from "@/lib/content/about";

export function Partners() {
  const { eyebrow, title, intro, items } = about.partners;

  return (
    <Section id="partners">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
          {eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-navy-900/70 sm:text-lg">
          {intro}
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {items.map((partner) => (
          <div
            key={partner.name}
            className="flex flex-col rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-8"
          >
            <h3 className="text-lg font-bold text-navy-900">{partner.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-900/70">
              {partner.description}
            </p>

            {partner.url ? (
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-steel-500 transition-colors hover:text-navy-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-500"
              >
                Visit website
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="mt-6 inline-flex items-center text-sm font-medium text-navy-900/40">
                Website coming soon
              </span>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
