"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";

const NAV_LINKS = navLinks;

export default function Navbar({ name }: { name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand">
          <span>{name}</span>
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={active ? "nav-link active" : "nav-link"}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="nav-toggle"
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen((state) => !state)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="nav-mobile container" aria-label="Mobile Primary">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "nav-link active" : "nav-link"}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
