import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function CruiseHalfFull() {
  return (
    <Section id="cruise" tone="navy">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sunset-500">
            Cruise &amp; port calls
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            In Busan for a day? We&apos;ll get you back on board in time.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Cruising into Busan port? We plan half- or full-day itineraries
            timed to your ship&apos;s schedule. Tell us your ship, port and
            dates in the form and we&apos;ll handle the rest.
          </p>
        </div>

        <Button href="#contact" className="shrink-0">
          Plan a port-call tour
        </Button>
      </div>
    </Section>
  );
}
