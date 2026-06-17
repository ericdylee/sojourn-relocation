import { Section } from "@/components/ui/Section";
import { about } from "@/lib/content/about";

export function AboutHero() {
  return (
    <Section id="about">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
          {about.eyebrow}
        </p>
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
          {about.title}
        </h1>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-navy-900/70 sm:text-lg">
          {about.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
