// Legal and company facts. Must match the Companies House register exactly
// (checked 13 November 2026). Shown in the footer, on /about and in the
// privacy notice — UK business websites must display these details.
export const companyContent = {
  legalName: "VOLTSERVICE LTD",
  companyNumber: "16613560",
  jurisdiction: "England and Wales",
  registeredOffice: "165 Gleneagle Road, Ground Floor, Lambeth, London, England, SW16 6AZ",
  companiesHouseUrl:
    "https://find-and-update.company-information.service.gov.uk/company/16613560",
  email: "voltservice@metalbrain.net",
} as const;

export function buildLegalLine(year: number) {
  const { legalName, jurisdiction, companyNumber, registeredOffice } = companyContent;
  return `© ${year} ${legalName}. Registered in ${jurisdiction}, company number ${companyNumber}. Registered office: ${registeredOffice}.`;
}
