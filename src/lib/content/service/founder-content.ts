import type { StaticImageData } from "next/image";
import founderAvatar from "@/assets/founder/babatunde-kalejaiye.png";
import linkedinIcon from "@/assets/social/linkedin.png";

export type FounderLink = {
  label: string;
  href: string;
  icon?: {
    src: StaticImageData;
    alt: string;
  };
};

// Internal paths are always valid; external links must be absolute https:// URLs.
export function isValidFounderLink(href: string): boolean {
  return href.startsWith("/") || href.startsWith("https://");
}

export const founderLinkedInUrl = "https://www.linkedin.com/in/babatunde-kalejaiye-729248125/";

export const founderContent = {
  name: "Babatunde Kalejaiye",
  role: "Founder & Software Engineer",
  actionText: "About the founder",
  supportingLine:
    "Clients work directly with the person responsible for shaping and delivering their software.",
  initials: "BK",
  avatar: {
    src: founderAvatar as StaticImageData,
    alt: "Portrait of Babatunde Kalejaiye, Founder and Software Engineer at VoltService Ltd.",
  },
  details: {
    title: "Babatunde Kalejaiye",
    subtitle: "Founder, VoltService Ltd.",
    paragraphs: [
      "I founded VoltService to help businesses turn operational problems and product ideas into dependable software. I work across product planning, software development, deployment, and long-term technical support.",
      "Clients work directly with me throughout the project, with additional specialists brought in when the work requires them.",
    ],
  },
  links: [
    {
      label: "LinkedIn",
      href: founderLinkedInUrl,
      icon: { src: linkedinIcon as StaticImageData, alt: "" },
    },
    { label: "Contact", href: "/contact" },
  ] satisfies FounderLink[],
} as const;
