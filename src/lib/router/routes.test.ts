import { describe, expect, it } from "vitest";
import { contactRoute, primaryNavRoutes } from "@/lib/router/routes";

describe("routes", () => {
  it("has unique hrefs across primary nav", () => {
    const hrefs = primaryNavRoutes.map((route) => route.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("does not duplicate the contact route in the primary nav", () => {
    expect(primaryNavRoutes.some((route) => route.href === contactRoute.href)).toBe(
      false,
    );
  });
});
