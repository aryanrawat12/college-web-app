import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Source_Serif_4, Space_Mono } from "next/font/google";
import BottomBar from "@/components/layout/BottomBar";
import CopyRights from "@/components/layout/CopyRights";
import NavBar from "@/components/layout/NavBar";
import TopBar from "@/components/layout/TopBar";
import FloatingActions from "@/components/shared/FloatingActions";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Akhil Bharti Group of Institutes (ABGI), Bhopal",
    template: "%s | ABGI",
  },
  description:
    "Akhil Bharti Group of Institutes, Bhopal — Pharmacy, Management and Teacher Education programmes. Approved by AICTE & PCI, affiliated to RGPV Bhopal.",
};

export const viewport: Viewport = {
  themeColor: "#16335f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${sourceSerif.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only rounded-md bg-brand-yellow px-4 py-2 font-semibold text-brand-blue focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to main content
        </a>

        <header className="fixed top-0 right-0 left-0 z-50 border-b border-border-warm bg-background/90 backdrop-blur-md">
          <TopBar />
          <NavBar />
        </header>

        <main id="main" tabIndex={-1} className="flex-1 pt-[100px] focus:outline-none">
          {children}
        </main>

        <FloatingActions />

        <BottomBar />
        <CopyRights />
      </body>
    </html>
  );
}
