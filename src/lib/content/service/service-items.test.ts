import { describe, expect, it } from "vitest";
import { serviceItems } from "@/lib/content/service/service-items";

describe("serviceItems", () => {
  it("is not empty", () => {
    expect(serviceItems.length).toBeGreaterThan(0);
  });

  it("has unique titles", () => {
    const titles = serviceItems.map((item) => item.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("gives every service at least one deliverable", () => {
    for (const item of serviceItems) {
      expect(item.deliverables.length).toBeGreaterThan(0);
    }
  });
});
