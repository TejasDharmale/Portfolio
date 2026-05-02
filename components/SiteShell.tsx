"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  name: string;
  linkedin: string;
  github: string;
  scholar: string;
  children: React.ReactNode;
};

export default function SiteShell({ name, linkedin, github, scholar, children }: Props) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar name={name} />
      <main className="container page-main">{children}</main>
      <Footer name={name} linkedin={linkedin} github={github} scholar={scholar} />
    </>
  );
}
