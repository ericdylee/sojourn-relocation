import { Section } from "@/components/ui/Section";
import { processSteps } from "@/lib/content/process";

export function Process() {
  const lastIndex = processSteps.length - 1;

  return (
    <Section id="process">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
          How it works
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl">
          From your home country to fully settled.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-navy-900/70 sm:text-lg">
          A clear, repeatable path — the same five stages for every family
          and every employee we relocate.
        </p>
      </div>

      <ol className="mt-14 flex flex-col lg:mt-16 lg:flex-row">
        {processSteps.map((step, index) => (
          <li key={step.n} className="relative flex flex-1 gap-5 pb-10 last:pb-0 lg:flex-col lg:gap-0 lg:pb-0">
            {index !== lastIndex ? (
              <span
                aria-hidden="true"
                className="absolute left-5 top-10 h-[calc(100%-2.5rem)] w-px bg-navy-900/15 lg:left-5 lg:right-0 lg:top-5 lg:h-px lg:w-[calc(100%-2.5rem)]"
              />
            ) : null}

            <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white ring-4 ring-white">
              {step.n}
            </span>

            <div className="lg:mt-5 lg:pr-6">
              <h3 className="text-lg font-bold text-navy-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/70 sm:text-base">
                {step.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
