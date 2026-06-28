import Link from "next/link";
import { aboutMenu, academicsMenu } from "@/lib/nav";
import { routes, siteConfig } from "@/lib/site";

const quickLinks = [
  { label: "How to Apply", href: routes.admissions },
  { label: "Placements", href: routes.placements },
  { label: "Campus Events", href: routes.campusLife },
  { label: "Gallery", href: routes.gallery },
  { label: "Contact Us", href: routes.contactUs },
  { label: "Choupal (Grievance)", href: routes.choupal },
];

export default function BottomBar() {
  return (
    <footer className="bg-brand-navy-deep text-[#9fb0cc]">
      {/* CTA band */}
      <div className="bg-brand-blue-dark text-white">
        <div className="container-page flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to begin your application?
            </h2>
            <p className="mt-2 max-w-xl text-[#b9c4d6]">
              Admissions counsellors are available Mon–Sat, 10 AM – 5 PM. Get a
              callback within one working day.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href={routes.enquiry}
              className="rounded-xl bg-brand-yellow px-7 py-3.5 text-base font-bold text-white shadow-[0_6px_18px_rgba(214,134,42,.34)] transition-colors hover:bg-brand-yellow-hover"
            >
              Apply Now
            </Link>
            <a
              href={siteConfig.prospectusUrl}
              className="rounded-xl border border-white/35 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              Download Prospectus ↓
            </a>
          </div>
        </div>
      </div>

      {/* Footer columns */}
      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div className="flex h-full flex-col">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-[#1c3f72] to-brand-blue-dark font-serif text-xl font-bold text-white">
              A
            </span>
            <div>
              <div className="font-serif text-base font-bold text-white">
                {siteConfig.fullName}
              </div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-[#6f82a3]">
                {siteConfig.city}
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed">
            {siteConfig.fullName}, {siteConfig.city}, Madhya Pradesh, India.
          </p>
          <div className="mt-3 flex-1 overflow-hidden rounded-xl border border-white/15">
            <iframe
              title="ABGI campus location"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.mapsQuery)}&hl=en&z=15&output=embed`}
              className="h-full min-h-[220px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-3 flex gap-2.5 text-sm leading-relaxed">
            <PinIcon />
            <span>
              Village-Kharpa, Ratibad, Bhopal 462044 (M.P.)
            </span>
          </p>
          <p className="mt-2 flex items-center gap-2.5 text-sm">
            <PhoneIcon />
            <span>
              Contact No:{" "}
              <a href="tel:9425079644" className="font-semibold text-white hover:text-brand-gold-light">
                9425079644
              </a>
            </span>
          </p>
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gold-light hover:text-white"
          >
            View on Google Maps →
          </a>
        </div>

        <FooterCol title="Academics" links={academicsMenu.items} />
        <FooterCol title="About" links={[...aboutMenu.items, ...quickLinks.slice(0, 2)]} />

        <div>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[#6f82a3]">
            Quick Links
          </div>
          <ul>
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block py-1.5 text-sm transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2.5">
              <PhoneIcon />
              <span>
                Admissions:{" "}
                <strong className="text-white">{siteConfig.helpline}</strong>
              </span>
            </div>
            {siteConfig.emails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 hover:text-white"
              >
                <MailIcon />
                {email}
              </a>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            <SocialLink href={siteConfig.linkedinCompanyUrl} label="LinkedIn">
              <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06C20.4 8.58 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21H9z" />
            </SocialLink>
            <SocialLink href={siteConfig.instagramUrl} label="Instagram">
              <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.38.19-1.7.32-.43.16-.74.36-1.06.68-.32.32-.52.63-.68 1.06-.13.32-.28.8-.32 1.7C3.21 9.5 3.2 9.85 3.2 13s.01 3.5.07 4.74c.04.9.19 1.38.32 1.7.16.43.36.74.68 1.06.32.32.63.52 1.06.68.32.13.8.28 1.7.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.19 1.7-.32.43-.16.74-.36 1.06-.68.32-.32.52-.63.68-1.06.13-.32.28-.8.32-1.7.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.38-.32-1.7a2.85 2.85 0 00-.68-1.06 2.85 2.85 0 00-1.06-.68c-.32-.13-.8-.28-1.7-.32C15.5 4.01 15.15 4 12 4zm0 3.07a4.93 4.93 0 110 9.86 4.93 4.93 0 010-9.86zm0 1.8a3.13 3.13 0 100 6.26 3.13 3.13 0 000-6.26zm5.13-3.27a1.15 1.15 0 110 2.3 1.15 1.15 0 010-2.3z" />
            </SocialLink>
            <SocialLink href={siteConfig.youtubeUrl} label="YouTube">
              <path d="M23.5 6.5a3 3 0 00-2.1-2.12C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.4.52A3 3 0 00.5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 002.1 2.12c1.9.52 9.4.52 9.4.52s7.5 0 9.4-.52a3 3 0 002.1-2.12C24 15.6 24 12 24 12s0-3.6-.5-5.5zM9.6 15.5v-7l6.2 3.5-6.2 3.5z" />
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 transition-colors hover:bg-white/10 hover:text-white"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        {children}
      </svg>
    </a>
  );
}

const iconClass = "mt-0.5 h-4 w-4 shrink-0 text-brand-gold-light";

function PinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={iconClass}>
      <path
        d="M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={iconClass}>
      <path d="M6.62 10.79a15.53 15.53 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={iconClass}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[#6f82a3]">
        {title}
      </div>
      <ul>
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="block py-1.5 text-sm transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
