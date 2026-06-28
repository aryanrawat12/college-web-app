"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import MobileNav from "@/components/layout/MobileNav";
import NavBranding from "@/components/layout/NavBranding";
import { navSchools } from "@/lib/home-data";
import {
  aboutMenu,
  academicsMenu,
  admissionsMenu,
  contactLink,
  mediaMenu,
  placementsLink,
  type NavGroup,
} from "@/lib/nav";
import { routes, siteConfig } from "@/lib/site";

const navLinkClass =
  "rounded-lg px-3 py-2.5 text-sm font-semibold text-[#34404f] transition-colors hover:bg-cream-2 hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

const chevron = (open: boolean) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`h-3.5 w-3.5 opacity-60 transition-transform ${open ? "rotate-180" : ""}`}
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

/** useDropdown — click toggle + outside-click + Escape close. */
function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return { open, setOpen, ref };
}

/** Simple link-list dropdown (About / Admissions / Media). */
function NavDropdown({ label, items }: NavGroup) {
  const { open, setOpen, ref } = useDropdown();
  const menuId = useId();
  const pathname = usePathname();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className={`${navLinkClass} inline-flex items-center gap-1.5`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((p) => !p)}
      >
        {label}
        {chevron(open)}
      </button>
      {open && (
        <ul
          id={menuId}
          role="menu"
          className="fade-up absolute left-0 top-full z-50 mt-2 min-w-[250px] rounded-xl border border-border-warm bg-surface p-2 shadow-[0_16px_40px_rgba(14,20,30,.18)]"
        >
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  role="menuitem"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-tint ${
                    active
                      ? "font-semibold text-brand-blue"
                      : "font-medium text-[#34404f] hover:text-brand-blue"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/** Academics mega-menu — department cards + program-finder CTA. */
function AcademicsMega() {
  const { open, setOpen, ref } = useDropdown();
  const menuId = useId();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className={`${navLinkClass} inline-flex items-center gap-1.5`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((p) => !p)}
      >
        {academicsMenu.label}
        {chevron(open)}
      </button>
      {open && (
        <div
          id={menuId}
          className="fade-up absolute left-1/2 top-full z-50 mt-2 w-[640px] max-w-[92vw] -translate-x-1/2 rounded-2xl border border-border-warm bg-surface p-5 shadow-[0_24px_48px_rgba(14,20,30,.18)]"
        >
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-yellow">
            Three Institutes, One Campus
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {navSchools.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className="group rounded-xl border border-border-warm p-3.5 transition-colors hover:border-brand-blue hover:bg-tint"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-cream-2 font-mono text-sm font-bold text-brand-blue">
                  {s.initials}
                </div>
                <div className="text-sm font-bold text-brand-blue">{s.name}</div>
                <div className="mt-0.5 text-xs text-faint">{s.programs}</div>
                <div className="mt-1 text-[11px] font-semibold text-brand-yellow">
                  {s.accred}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 rounded-xl bg-brand-blue-dark p-4 text-white">
            <div>
              <div className="font-serif text-base font-semibold">
                Not sure which programme fits?
              </div>
              <div className="text-xs text-[#b9c4d6]">
                Filter all six programmes by level &amp; discipline.
              </div>
            </div>
            <Link
              href="/#finder"
              onClick={() => setOpen(false)}
              className="shrink-0 rounded-lg bg-brand-yellow px-3.5 py-2 text-[13px] font-bold text-white transition-colors hover:bg-brand-yellow-hover"
            >
              Program Finder →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const directLinkClass = (href: string) =>
    `${navLinkClass} ${pathname === href ? "text-brand-blue" : ""}`;

  return (
    <nav className="bg-transparent" aria-label="Main navigation">
      <div className="container-page grid h-[74px] grid-cols-[auto_1fr_auto] items-center gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link
            href={routes.home}
            className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            aria-label="Go to home"
          >
            <Image
              src={siteConfig.logo}
              alt="ABGI logo"
              fill
              className="object-cover"
              priority
              sizes="44px"
            />
          </Link>
          <NavBranding />
        </div>

        <div className="hidden items-center justify-center gap-1 xl:flex">
          <Link href={routes.home} className={directLinkClass(routes.home)}>
            Home
          </Link>
          <NavDropdown {...aboutMenu} />
          <AcademicsMega />
          <NavDropdown {...admissionsMenu} />
          <Link
            href={placementsLink.href}
            className={directLinkClass(placementsLink.href)}
          >
            {placementsLink.label}
          </Link>
          <NavDropdown {...mediaMenu} />
          <Link
            href={contactLink.href}
            className={directLinkClass(contactLink.href)}
          >
            {contactLink.label}
          </Link>
        </div>

        <div className="flex items-center justify-end gap-2.5">
          <Link
            href={routes.enquiry}
            className="hidden rounded-lg border border-brand-blue bg-surface px-4 py-2.5 text-sm font-bold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white sm:inline-flex"
          >
            Enquire
          </Link>
          <Link
            href={routes.apply}
            className="hidden rounded-lg bg-brand-yellow px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(214,134,42,.34)] transition-colors hover:bg-brand-yellow-hover sm:inline-flex"
          >
            Apply Now
          </Link>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
