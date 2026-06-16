import { describe, it, expect } from "vitest";
import { leadSchema } from "./schema";

describe("leadSchema", () => {
  const base = { intent: "relocation", name: "A", email: "a@b.com", message: "hi", company: "", phone: "", website: "" };

  it("accepts a valid relocation lead", () => expect(leadSchema.safeParse(base).success).toBe(true));

  it("rejects bad email", () => expect(leadSchema.safeParse({ ...base, email: "nope" }).success).toBe(false));

  it("flags honeypot (website filled)", () => expect(leadSchema.safeParse({ ...base, website: "x" }).success).toBe(false));

  it("requires tour fields when intent=tour", () => {
    expect(leadSchema.safeParse({ ...base, intent: "tour" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...base, intent: "tour", tourDate: "2026-07-01", partySize: 2, duration: "full" }).success).toBe(true);
  });
});
