import { CourseGrid } from "./CourseGrid";
import { seoulCourses } from "@/lib/content/tour";

export function SeoulCourses() {
  return (
    <CourseGrid
      id="seoul"
      eyebrow="Seoul"
      title="The capital, on your terms."
      intro="Royal palaces, hanok lanes and night markets — a local guide meets you in Seoul too."
      courses={seoulCourses}
      tone="sand"
    />
  );
}
