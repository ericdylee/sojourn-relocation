import { Section } from "@/components/ui/Section";

type Feature = {
  title: string;
  description: string;
  icon: (props: { className?: string }) => React.ReactNode;
};

function GuideIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 20c0-3.59 2.91-6 6.5-6s6.5 2.41 6.5 6" />
      <path d="M12 1.5v1.5" />
    </svg>
  );
}

function RouteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="6" cy="6" r="2.25" />
      <circle cx="18" cy="18" r="2.25" />
      <path d="M8.25 6H15a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6.75" />
    </svg>
  );
}

function GroupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="9" cy="8.5" r="2.75" />
      <path d="M3.5 19c0-3.04 2.46-5 5.5-5s5.5 1.96 5.5 5" />
      <path d="M16 6.2a2.75 2.75 0 0 1 0 5.1" />
      <path d="M17 14.2c2.2.5 3.5 2.2 3.5 4.8" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

const features: Feature[] = [
  {
    title: "English-speaking guides",
    description: "One local guide in Busan, one in Seoul — no language barrier, no scripted bus tour.",
    icon: GuideIcon,
  },
  {
    title: "Tailored itineraries",
    description: "Built around your pace and interests, not a fixed group schedule.",
    icon: RouteIcon,
  },
  {
    title: "For every traveler",
    description: "Families, home-buyers, first-time tourists and cruise guests in port.",
    icon: GroupIcon,
  },
  {
    title: "Half or full day",
    description: "Flexible durations that fit a short port call or a full day out.",
    icon: ClockIcon,
  },
];

export function WhyTour() {
  return (
    <Section id="why-tour">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sunset-500">
          Why a private tour
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl">
          A local day out, not a tour-bus checklist.
        </h2>
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ title, description, icon: Icon }) => (
          <div key={title} className="flex flex-col items-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sunset-500/10 ring-1 ring-sunset-500/20">
              <Icon className="h-6 w-6 text-sunset-500" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-navy-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-900/70">
              {description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
