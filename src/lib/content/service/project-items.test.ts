import { describe, expect, it } from "vitest";
import { projectItems } from "@/lib/content/service/project-items";

describe("projectItems", () => {
  it("frames every project as an example of our work", () => {
    for (const project of projectItems) {
      expect(project.eyebrow).toBe("Example of our work");
    }
  });

  it("links every project to an https URL", () => {
    for (const project of projectItems) {
      expect(project.url).toMatch(/^https:\/\//);
    }
  });
});
