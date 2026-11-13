import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { SiteLayoutContent } from "@/components/layout/site-layout-content";
import { clientEnv } from "@/lib/env/env";
import { buildOrganizationJsonLd } from "@/lib/seo/organization-json-ld";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.siteUrl),
  title: {
    default: "VoltService Ltd — Software Services Built Around Your Business",
    template: "%s — VoltService Ltd",
  },
  description:
    "VoltService Ltd designs and develops reliable websites, applications, and digital systems that help businesses improve operations, serve customers, and grow with confidence.",
};

// Marks the document as JS-capable before first paint, so scroll reveals
// (see RevealObserver) never hide content for visitors without JavaScript.
const jsFlagScript = "document.documentElement.classList.add('js')";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        instrumentSans.variable,
        bricolageGrotesque.variable,
        jetbrainsMono.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: jsFlagScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganizationJsonLd()),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteLayoutContent>{children}</SiteLayoutContent>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
