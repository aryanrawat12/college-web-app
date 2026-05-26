"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import NavBranding from "@/components/layout/NavBranding";
import { routes, siteConfig } from "@/lib/site";

type NavItem = { label: string; href: string };

type DropdownConfig = {
  label: string;
  items: NavItem[];
};

const aboutMenu: NavItem[] = [
  { label: "About", href: routes.about },
  { label: "Leadership", href: routes.leadership },
  { label: "Approvals", href: routes.approvals },
  { label: "Mandatory Disclosures", href: routes.mandatoryDisclosures },
];

const departmentMenu: NavItem[] = [
  { label: "Pharmacy", href: routes.pharmacy },
  { label: "Management", href: routes.management },
  { label: "Teaching Education", href: routes.teachingEducation },
];

const campusMenu: NavItem[] = [
  { label: "Campus Life", href: routes.campusLife },
  { label: "Choupal", href: routes.choupal },
];

const navLinkClass =
  "text-sm font-medium text-brand-blue transition-colors hover:text-brand-yellow";

function NavDropdown({ label, items }: DropdownConfig) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className={`${navLinkClass} inline-flex items-center gap-1`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
      >
        {label}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <ul
          id={menuId}
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 min-w-[220px] rounded-md border border-brand-blue/10 bg-white py-2 shadow-lg"
        >
          {items.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                role="menuitem"
                className="block px-4 py-2 text-sm text-brand-blue transition-colors hover:bg-brand-blue/5 hover:text-brand-yellow"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function NavBar() {
  return (
    <nav
      className="border-b border-brand-blue/10 bg-white"
      aria-label="Main navigation"
    >
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link
            href={routes.home}
            className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full"
            aria-label="Go to home"
          >
            <Image
              src={siteConfig.logo}
              alt={`${siteConfig.name} logo`}
              fill
              className="object-cover"
              sizes="40px"
            />
          </Link>
          <NavBranding />
        </div>

        <div className="hidden items-center justify-center gap-6 md:flex lg:gap-8">
          <NavDropdown label="About" items={aboutMenu} />
          <NavDropdown label="Department" items={departmentMenu} />
          <Link href={routes.faculty} className={navLinkClass}>
            Faculty
          </Link>
          <NavDropdown label="Campus life @ ABGI" items={campusMenu} />
        </div>

        <div className="flex justify-end">
          <Link
            href={routes.enquiry}
            className="rounded-md bg-brand-yellow px-4 py-2 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-yellow-hover"
          >
            Enquire Now
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 border-t border-brand-blue/5 px-4 py-2 md:hidden">
        <NavDropdown label="About" items={aboutMenu} />
        <NavDropdown label="Department" items={departmentMenu} />
        <Link href={routes.faculty} className={navLinkClass}>
          Faculty
        </Link>
        <NavDropdown label="Campus life @ ABGI" items={campusMenu} />
      </div>
    </nav>
  );
}
