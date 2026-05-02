import type { Metadata } from "next";
import { Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import { getProfile } from "@/lib/content";

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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const profile = await getProfile();

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${fraunces.variable}`}>
      <body>
        <div className="aurora" aria-hidden="true" />
        <SiteShell
          name={profile.name}
          linkedin={profile.linkedin}
          github={profile.github}
          scholar={profile.scholar}
        >
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
