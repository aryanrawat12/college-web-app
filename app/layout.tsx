import type { Metadata, Viewport } from "next";
import { Lora } from "next/font/google";
import BottomBar from "@/components/layout/BottomBar";
import CopyRights from "@/components/layout/CopyRights";
import NavBar from "@/components/layout/NavBar";
import TopBar from "@/components/layout/TopBar";
import FloatingActions from "@/components/shared/FloatingActions";
import { fetchContactInfo } from "@/lib/queries";
import "./globals.css";

// Lora everywhere — one family for sans/serif/mono (see globals.css).
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await fetchContactInfo();
  return (
    <html
      lang="en"
      className={`${lora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only rounded-md bg-brand-yellow px-4 py-2 font-semibold text-brand-blue focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to main content
        </a>

        <header className="fixed top-0 right-0 left-0 z-50 border-b border-border-warm bg-background/90 backdrop-blur-md">
          <TopBar contact={contact} />
          <NavBar />
        </header>

        <main id="main" tabIndex={-1} className="flex-1 pt-[100px] focus:outline-none">
          {children}
        </main>

        <FloatingActions contact={contact} />

        <BottomBar contact={contact} />
        <CopyRights />
      </body>
    </html>
  );
}
