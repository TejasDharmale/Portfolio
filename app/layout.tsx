import type { Metadata } from "next";
import { Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Srushti Dharmale | Portfolio",
  description:
    "Portfolio of Srushti Dharmale, PhD researcher and AI engineer focused on applied intelligence and production systems.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${fraunces.variable}`}>
      <body>
        <div className="aurora" aria-hidden="true" />
        <Navbar />
        <main className="container page-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
