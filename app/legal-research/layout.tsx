import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./legal.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-ac-display",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-ac-sans",
});

export const metadata: Metadata = {
  title: "Apex Counsel | Indian Legal Research Bot",
  description:
    "Ultimate multi-source Indian legal research — Supreme Court, High Courts, Indian Kanoon, SCC, LiveLaw, iPleaders, Cyril Amarchand and law firms. Ranked case law with paragraphs and relevancy scores.",
};

export default function LegalResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${display.variable} ${sans.variable} apex-root`}>
      {children}
    </div>
  );
}
