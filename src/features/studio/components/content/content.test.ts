import { legalLine, siteConfig } from "@/shared/config/site";

import { contactDetails, footerGroups, founderProfile, navigation, processSteps, products, services } from "./content";

describe("studio content", () => {
  it("keeps top-level routes unique and page-oriented", () => {
    const hrefs = navigation.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs).toEqual(["/services", "/work", "/how-we-work", "/about"]);
  });

  it("lists the four services, each with three points", () => {
    expect(services).toHaveLength(4);
    expect(new Set(services.map((s) => s.slug)).size).toBe(4);
    services.forEach((service) => expect(service.points).toHaveLength(3));
  });

  it("shows only the products we actually run", () => {
    expect(products.map((p) => p.name)).toEqual(["PaySmart", "VoltConnects"]);
    products.forEach((p) => expect(p.url).toMatch(/^https:\/\//));
  });

  it("numbers the process steps in order", () => {
    expect(processSteps.map((s) => s.number)).toEqual(["01", "02", "03", "04"]);
  });

  it("uses the real founder and company details", () => {
    expect(founderProfile.name).toBe("Babatunde Kalejaiye");
    expect(founderProfile.image).toBe("/brand/founder-babatunde-kalejaiye.jpg");
    expect(contactDetails.email).toBe("voltservice@metalbrain.net");
    expect(siteConfig.legal.companyNumber).toBe("16613560");
    expect(legalLine(2026)).toBe(
      "© 2026 VOLTSERVICE LTD. Registered in England and Wales, company number 16613560. Registered office: 165 Gleneagle Road, Ground Floor, Lambeth, London, England, SW16 6AZ.",
    );
  });

  it("links the privacy notice and terms from the footer", () => {
    const legal = footerGroups.find((g) => g.title === "Legal");
    expect(legal?.links.map((l) => l.href)).toEqual(
      expect.arrayContaining(["/privacy", "/terms"]),
    );
  });
});
