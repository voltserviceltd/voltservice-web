import { contactDetails, navigation, portfolio } from "./content";

describe("studio content", () => {
  it("keeps anchor targets unique and section-oriented", () => {
    const hrefs = navigation.map((item) => item.href);
    const uniqueHrefs = new Set(hrefs);

    expect(uniqueHrefs.size).toBe(hrefs.length);
    expect(hrefs.every((href) => href.startsWith("#"))).toBe(true);
  });

  it("keeps the visible company portfolio aligned with core products", () => {
    expect(portfolio.map((item) => item.name)).toEqual(
      expect.arrayContaining(["BuildersHub", "PaySmart", "VoltPay"]),
    );

    expect(portfolio.every((item) => item.image.length > 0)).toBe(true);
    expect(contactDetails.email).toBe("voltservice@metalbrain.net");
  });
});
