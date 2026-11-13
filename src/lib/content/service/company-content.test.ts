import { describe, expect, it } from "vitest";
import { buildLegalLine, companyContent } from "@/lib/content/service/company-content";

describe("companyContent", () => {
  it("matches the Companies House register", () => {
    expect(companyContent.legalName).toBe("VOLTSERVICE LTD");
    expect(companyContent.companyNumber).toBe("16613560");
    expect(companyContent.companiesHouseUrl).toContain(companyContent.companyNumber);
  });

  it("builds the footer legal line", () => {
    expect(buildLegalLine(2026)).toBe(
      "© 2026 VOLTSERVICE LTD. Registered in England and Wales, company number 16613560. Registered office: 165 Gleneagle Road, Ground Floor, Lambeth, London, England, SW16 6AZ.",
    );
  });
});
