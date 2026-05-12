import { contactDetails, founderProfile, navigation, portfolio } from "./content";

describe("studio content", () => {
  it("keeps top-level routes unique and page-oriented", () => {
    const hrefs = navigation.map((item) => item.href);
    const uniqueHrefs = new Set(hrefs);

    expect(uniqueHrefs.size).toBe(hrefs.length);
    expect(hrefs).toEqual(["/products", "/services", "/approach", "/about", "/contact"]);
  });

  it("keeps the visible company portfolio aligned with core products", () => {
    expect(portfolio.map((item) => item.name)).toEqual(
      expect.arrayContaining(["BuildersHub", "PaySmart", "VoltPay"]),
    );

    expect(
      portfolio.find((item) => item.name === "BuildersHub")?.screenshots,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ image: "/brand/projectlist.png" }),
        expect.objectContaining({ image: "/brand/collaborate.png" }),
        expect.objectContaining({ image: "/brand/inbox.png" }),
        expect.objectContaining({ image: "/brand/connect.png" }),
      ]),
    );
    expect(portfolio.every((item) => item.image.length > 0)).toBe(true);
    expect(contactDetails.email).toBe("voltservice@metalbrain.net");
  });

  it("keeps founder content easy to replace", () => {
    expect(navigation).toContainEqual({ label: "About", href: "/about" });
    expect(founderProfile.name).toBe("Voltservice Founder");
    expect(founderProfile.details).toHaveLength(3);
  });
});
