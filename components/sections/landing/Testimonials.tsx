import { Section } from "@/components/ui/Section";
import { site } from "@/lib/content/site";
import { testimonials } from "@/lib/content/testimonials";

function QuoteMark() {
  return (
    <svg
      viewBox="0 0 32 24"
      fill="currentColor"
      className="h-7 w-8 text-steel-500/30"
      aria-hidden="true"
    >
      <path d="M9.5 0C4.3 2.9 0 8.6 0 14.9 0 20 3.3 24 8.1 24c4 0 6.9-3.1 6.9-6.9 0-3.6-2.6-6.2-6-6.2-.6 0-1.1.1-1.5.2C8.1 7.6 11 4 15.4 1.9L9.5 0Zm17.1 0C21.4 2.9 17 8.6 17 14.9c0 5.1 3.3 9.1 8.1 9.1 4 0 6.9-3.1 6.9-6.9 0-3.6-2.6-6.2-6-6.2-.6 0-1.1.1-1.5.2.5-3.5 3.4-7.1 7.8-9.2L26.6 0Z" />
    </svg>
  );
}

export function Testimonials() {
  return (
    <Section id="testimonials" tone="sand">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
          Proof
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl">
          From people who actually moved here.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-navy-900/70 sm:text-lg">
          Real recommendations from foreign experts who relocated to Busan
          for {site.marqueeClient}.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-7">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.author}
            className="flex flex-col rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-8"
          >
            <QuoteMark />
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-navy-900/80 sm:text-base">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-navy-900/10 pt-4">
              <p className="text-base font-bold text-navy-900">
                {testimonial.author}
              </p>
              <p className="mt-0.5 text-sm text-navy-900/55">
                {testimonial.role} &middot; {testimonial.year}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
