import { describe, it, expect } from "vitest";
import { services } from "./services";
import { testimonials } from "./testimonials";
import { processSteps } from "./process";
import { busanCourses, seoulCourses } from "./tour";
import { site } from "./site";

describe("content invariants", () => {
  it("has 6 services, each with id/title/desc/items", () => {
    expect(services).toHaveLength(6);
    for (const s of services) {
      expect(s.id && s.title && s.summary).toBeTruthy();
      expect(Array.isArray(s.items)).toBe(true);
    }
  });
  it("has 5 named testimonials with quote+author", () => {
    expect(testimonials).toHaveLength(5);
    for (const t of testimonials) expect(t.quote && t.author).toBeTruthy();
  });
  it("has a process timeline", () => expect(processSteps.length).toBeGreaterThanOrEqual(4));
  it("has busan and seoul courses", () => {
    expect(busanCourses.length).toBeGreaterThanOrEqual(3);
    expect(seoulCourses.length).toBeGreaterThanOrEqual(3);
  });
  it("has contact details", () => {
    expect(site.email).toBe("rosh.yum@sojournkorea.net");
    expect(site.whatsapp).toContain("+82");
  });
});
