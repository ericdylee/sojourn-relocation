import Image from "next/image";
import { Section } from "@/components/ui/Section";
import type { Course } from "@/lib/content/tour";

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 h-4 w-4 shrink-0 text-sunset-500"
      aria-hidden="true"
    >
      <path d="M12 21c-4.5-4-7-7.2-7-10.5A7 7 0 0 1 19 10.5C19 13.8 16.5 17 12 21z" />
      <circle cx="12" cy="10.3" r="2.3" />
    </svg>
  );
}

export function CourseGrid({
  id,
  eyebrow,
  title,
  intro,
  courses,
  tone = "light",
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  courses: Course[];
  tone?: "light" | "sand";
}) {
  return (
    <Section id={id} tone={tone}>
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sunset-500">
          {eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-navy-900/70 sm:text-lg">
          {intro}
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <article
            key={course.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-sm"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand-50">
              <Image
                src={course.image}
                alt={course.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white">
                {course.length}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-bold text-navy-900">{course.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {course.stops.map((stop) => (
                  <li
                    key={stop}
                    className="flex items-start gap-2.5 text-sm text-navy-900/80"
                  >
                    <PinIcon />
                    <span className="leading-snug">{stop}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
