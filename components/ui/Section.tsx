import { Container } from "./Container";

export function Section({ id, tone = "light", className = "", children }:
  { id?: string; tone?: "light" | "navy" | "sand"; className?: string; children: React.ReactNode }) {
  const bg = tone === "navy" ? "bg-navy-900 text-white" : tone === "sand" ? "bg-sand-50" : "bg-white";
  return (
    <section id={id} className={`py-20 sm:py-28 ${bg} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
