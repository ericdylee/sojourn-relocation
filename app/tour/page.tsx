import type { Metadata } from "next";
import { TourHero } from "@/components/sections/tour/TourHero";
import { WhyTour } from "@/components/sections/tour/WhyTour";
import { BusanCourses } from "@/components/sections/tour/BusanCourses";
import { SeoulCourses } from "@/components/sections/tour/SeoulCourses";
import { CruiseHalfFull } from "@/components/sections/tour/CruiseHalfFull";
import { Gallery } from "@/components/sections/tour/Gallery";
import { Section } from "@/components/ui/Section";
import { ConsultationForm } from "@/components/form/ConsultationForm";
import { site } from "@/lib/content/site";

const description =
  "English-speaking private day tours of Busan and Seoul — tailored half- and full-day itineraries for families, buyers, tourists and cruise guests.";

export const metadata: Metadata = {
  title: "Private Tours in Busan & Seoul",
  description,
  alternates: { canonical: "/tour" },
  openGraph: {
    title: "Private Tours in Busan & Seoul | SOJOURN KOREA",
    description,
    url: `${site.url}/tour`,
    images: [
      {
        url: "/images/tour-busan.jpg",
        width: 1600,
        height: 865,
        alt: "Busan coastline at sunset — private tours by SOJOURN KOREA",
      },
    ],
  },
  twitter: {
    title: "Private Tours in Busan & Seoul | SOJOURN KOREA",
    description,
    images: ["/images/tour-busan.jpg"],
  },
};

export default function TourPage() {
  return (
    <>
      <TourHero />
      <WhyTour />
      <BusanCourses />
      <SeoulCourses />
      <CruiseHalfFull />
      <Gallery />
      <Section id="contact" tone="sand">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sunset-500">
            Plan your tour
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl">
            Tell us where you want to go.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-900/70">
            Share your city, dates and group — Rosh replies personally, usually
            within a day.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl">
          <ConsultationForm context="tour" />
        </div>
      </Section>
    </>
  );
}
