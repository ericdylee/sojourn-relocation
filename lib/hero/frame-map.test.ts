import { describe, it, expect } from "vitest";
import { frameForProgress } from "./frame-map";

describe("frameForProgress", () => {
  it("clamps to first frame at/under 0", () => {
    expect(frameForProgress(-0.5, 100)).toBe(0);
    expect(frameForProgress(0, 100)).toBe(0);
  });
  it("clamps to last frame at/over 1", () => {
    expect(frameForProgress(1, 100)).toBe(99);
    expect(frameForProgress(2, 100)).toBe(99);
  });
  it("maps midpoint", () => expect(frameForProgress(0.5, 100)).toBe(50));
});
