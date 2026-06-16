import { Container } from "@/components/ui/Container";
import { site } from "@/lib/content/site";

const signals = [
  {
    label: "Trusted by experts at",
    value: site.marqueeClient,
  },
  {
    label: "Member",
    value: site.kita.replace(/^Member,\s*/, ""),
  },
  {
    label: "Operating",
    value: `Since ${site.since}`,
  },
  {
    label: "Rated",
    value: "★★★★★ from relocated expats",
  },
];

export function TrustStrip() {
  return (
    <div className="border-y border-navy-900/10 bg-white">
      <Container className="py-6 sm:py-7">
        <ul className="flex flex-col items-stretch divide-y divide-navy-900/10 text-center sm:flex-row sm:items-center sm:justify-center sm:divide-x sm:divide-y-0">
          {signals.map((signal) => (
            <li
              key={signal.label}
              className="flex flex-col items-center gap-1 py-3 sm:px-6 sm:py-0 first:sm:pl-0 last:sm:pr-0"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-900/45">
                {signal.label}
              </span>
              <span className="text-sm font-medium text-navy-900 sm:text-[15px]">
                {signal.value}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
