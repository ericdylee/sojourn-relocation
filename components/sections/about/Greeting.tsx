import { Section } from "@/components/ui/Section";
import { about } from "@/lib/content/about";

function QuoteMark() {
  return (
    <svg
      viewBox="0 0 32 24"
      fill="currentColor"
      className="h-8 w-10 text-steel-500/30"
      aria-hidden="true"
    >
      <path d="M9.5 0C4.3 2.9 0 8.6 0 14.9 0 20 3.3 24 8.1 24c4 0 6.9-3.1 6.9-6.9 0-3.6-2.6-6.2-6-6.2-.6 0-1.1.1-1.5.2C8.1 7.6 11 4 15.4 1.9L9.5 0Zm17.1 0C21.4 2.9 17 8.6 17 14.9c0 5.1 3.3 9.1 8.1 9.1 4 0 6.9-3.1 6.9-6.9 0-3.6-2.6-6.2-6-6.2-.6 0-1.1.1-1.5.2.5-3.5 3.4-7.1 7.8-9.2L26.6 0Z" />
    </svg>
  );
}

export function Greeting() {
  const { eyebrow, body, name, role, initials } = about.greeting;

  return (
    <Section tone="sand">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
          {eyebrow}
        </p>

        <QuoteMark />

        <blockquote className="mt-4 space-y-5 text-lg leading-relaxed text-navy-900/85 sm:text-xl">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </blockquote>

        <figcaption className="mt-8 flex items-center gap-4">
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-900 text-base font-bold tracking-wide text-white"
            aria-hidden="true"
          >
            {initials}
          </span>
          <span>
            <span className="block text-base font-bold text-navy-900">
              {name}
            </span>
            <span className="block text-sm text-navy-900/60">{role}</span>
          </span>
        </figcaption>
      </div>
    </Section>
  );
}
