import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { Greeting } from "@/components/sections/about/Greeting";
import { Partners } from "@/components/sections/about/Partners";
import { Section } from "@/components/ui/Section";
import { ConsultationForm } from "@/components/form/ConsultationForm";
import { site } from "@/lib/content/site";

const description =
  "Who we are: SOJOURN KOREA has handled visas, housing and settling-in for expats in Busan and Seoul since 2011 — English-only, 1:1, with trusted local partners.";

export const metadata: Metadata = {
  title: "About us",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About us | SOJOURN KOREA",
    description,
    url: `${site.url}/about`,
    images: [
      {
        url: "/hero/poster.jpg",
        width: 1280,
        height: 720,
        alt: "SOJOURN KOREA — visa and relocation for expats in Busan & Seoul",
      },
    ],
  },
  twitter: {
    title: "About us | SOJOURN KOREA",
    description,
    images: ["/hero/poster.jpg"],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Greeting />
      <Partners />
      <Section id="contact" tone="navy">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-300">
            Get started
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Let&apos;s talk about your move.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Tell us about your relocation or tour. Rosh replies personally —
            usually within a day.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl">
          <ConsultationForm context="relocation" />
        </div>
      </Section>
    </>
  );
}
