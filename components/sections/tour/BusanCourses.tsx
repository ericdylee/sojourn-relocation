import { CourseGrid } from "./CourseGrid";
import { busanCourses } from "@/lib/content/tour";

export function BusanCourses() {
  return (
    <CourseGrid
      id="busan"
      eyebrow="Busan"
      title="Where we live — and love to show people."
      intro="Hillside art villages, fish markets and sea-cliff temples, guided by someone who calls Busan home."
      courses={busanCourses}
    />
  );
}
