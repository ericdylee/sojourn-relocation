import { Hero } from "@/components/hero/Hero";
import { TrustStrip } from "@/components/sections/landing/TrustStrip";
import { Services } from "@/components/sections/landing/Services";
import { WhySojourn } from "@/components/sections/landing/WhySojourn";
import { Process } from "@/components/sections/landing/Process";
import { Testimonials } from "@/components/sections/landing/Testimonials";
import { TourTeaser } from "@/components/sections/landing/TourTeaser";
import { Section } from "@/components/ui/Section";
import { ConsultationForm } from "@/components/form/ConsultationForm";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <WhySojourn />
      <Process />
      <Testimonials />
      <TourTeaser />
      <Section id="contact">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
            Get started
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl">
            Request a consultation
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-900/70">
            Tell us about your move or your tour. Rosh replies personally — usually within a day.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl">
          <ConsultationForm context="relocation" />
        </div>
      </Section>
    </>
  );
}
