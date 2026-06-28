"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  contactLink,
  menuGroups,
  placementsLink,
  type NavLink,
} from "@/lib/nav";
import { routes } from "@/lib/site";

function ItemLink({
  item,
  pathname,
  onNavigate,
}: {
  item: NavLink;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = pathname === item.href;
  return (
    <Link
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      aria-current={active ? "page" : undefined}
      className={`block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-tint ${
        active ? "font-semibold text-brand-yellow" : "text-[#34404f]"
      }`}
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  );
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll, focus close button, and wire Escape while open.
  // (Links close the drawer via onNavigate, so no route-change effect needed.)
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-blue transition-colors hover:bg-brand-blue/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        style={{ touchAction: "manipulation" }}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
          <path
            d="M4 6h16M4 12h16M4 18h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute top-0 right-0 flex h-full w-[85%] max-w-sm flex-col overflow-y-auto overscroll-contain bg-background shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-border-warm px-4 py-3">
              <span className="font-serif text-base font-bold text-brand-blue">
                Menu
              </span>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-brand-blue transition-colors hover:bg-brand-blue/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex-1 px-2 py-3">
              <ItemLink
                item={{ label: "Home", href: routes.home }}
                pathname={pathname}
                onNavigate={close}
              />
              {menuGroups.map((group) => (
                <details key={group.label} className="group border-t border-brand-blue/5">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-sm font-semibold text-brand-blue">
                    {group.label}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 transition-transform group-open:rotate-180"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </summary>
                  <div className="pb-2 pl-2">
                    {group.items.map((item) => (
                      <ItemLink
                        key={item.href}
                        item={item}
                        pathname={pathname}
                        onNavigate={close}
                      />
                    ))}
                  </div>
                </details>
              ))}
              <div className="border-t border-brand-blue/5">
                <ItemLink item={placementsLink} pathname={pathname} onNavigate={close} />
                <ItemLink item={contactLink} pathname={pathname} onNavigate={close} />
              </div>
            </nav>

            <div className="space-y-2 border-t border-border-warm p-4">
              <Link
                href={routes.apply}
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-brand-yellow px-4 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-brand-yellow-hover"
              >
                Apply Now
              </Link>
              <Link
                href={routes.enquiry}
                onClick={() => setOpen(false)}
                className="block rounded-lg border border-brand-blue px-4 py-2.5 text-center text-sm font-bold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
              >
                Enquire
              </Link>
            </div>
          </div>
        </div>,
          document.body,
        )}
    </div>
  );
}
