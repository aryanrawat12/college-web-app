import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BottomBar from "@/components/layout/BottomBar";
import CopyRights from "@/components/layout/CopyRights";
import NavBar from "@/components/layout/NavBar";
import TopBar from "@/components/layout/TopBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ABGI | Institute",
  description: "Official website of the institute",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-foreground">
        <header className="fixed top-0 right-0 left-0 z-50 bg-white shadow-md">
          <TopBar />
          <NavBar />
        </header>

        <main className="flex-1 pt-[168px] md:pt-[120px]">{children}</main>

        <BottomBar />
        <CopyRights />
      </body>
    </html>
  );
}
