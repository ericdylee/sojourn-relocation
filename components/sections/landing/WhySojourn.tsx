import { Section } from "@/components/ui/Section";

type ValueProp = {
  title: string;
  description: string;
  icon: (props: { className?: string }) => React.ReactNode;
};

function ManagerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 20c0-3.59 2.91-6 6.5-6s6.5 2.41 6.5 6" />
      <path d="M16.5 5.5c.97.55 1.6 1.6 1.6 2.75 0 1.46-.99 2.69-2.35 3.07" />
    </svg>
  );
}

function NetworkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="5" r="2.25" />
      <circle cx="5.5" cy="18" r="2.25" />
      <circle cx="18.5" cy="18" r="2.25" />
      <path d="M10.5 6.7L7 16M13.5 6.7L17 16M7.7 18h8.6" />
    </svg>
  );
}

function HonestyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 4l7 3v5c0 4.2-3 7.4-7 8.5-4-1.1-7-4.3-7-8.5V7l7-3z" />
      <path d="M9 12.2l2.1 2.1L15.5 10" />
    </svg>
  );
}

function EndToEndIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="4.5" cy="12" r="2" />
      <circle cx="19.5" cy="12" r="2" />
      <path d="M6.5 12h4M13.5 12h4" />
      <path d="M10.5 8.5h3v7h-3z" />
    </svg>
  );
}

const values: ValueProp[] = [
  {
    title: "1:1 managing",
    description: "A single dedicated manager handles your entire move.",
    icon: ManagerIcon,
  },
  {
    title: "Local best-partner network",
    description: "Vetted Korean partners for housing, legal and logistics.",
    icon: NetworkIcon,
  },
  {
    title: "Truly honest service",
    description: "We listen to every need and tell you the truth.",
    icon: HonestyIcon,
  },
  {
    title: "One-stop, end to end",
    description: "Visa, home and daily life — handled by one team.",
    icon: EndToEndIcon,
  },
];

export function WhySojourn() {
  return (
    <Section id="why-sojourn" tone="navy">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-300">
          Why Sojourn
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
          Why families and HR teams choose Sojourn
        </h2>
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ title, description, icon: Icon }) => (
          <div key={title} className="flex flex-col items-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
              <Icon className="h-6 w-6 text-steel-300" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
