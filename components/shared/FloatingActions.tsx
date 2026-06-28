import Link from "next/link";
import { routes, siteConfig } from "@/lib/site";

const telHref = `tel:${siteConfig.helpline.replace(/\s+/g, "")}`;
const waHref = `https://wa.me/${siteConfig.whatsapp}`;

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_22px_rgba(37,211,102,.45)] transition-transform hover:scale-105"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.78 14.06c-.24.68-1.42 1.32-1.95 1.36-.5.04-1.13.21-3.66-.77-3.07-1.21-5.04-4.36-5.19-4.56-.15-.2-1.24-1.65-1.24-3.15s.79-2.24 1.07-2.54c.28-.31.61-.38.82-.38.2 0 .41.002.59.01.19.008.44-.072.69.53.24.59.82 2.04.89 2.19.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.18-.31.39-.45.53-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.3.15.47.12.65-.07.18-.2.74-.86.94-1.16.2-.3.39-.25.66-.15.27.1 1.71.81 2 .96.3.15.49.22.56.34.07.13.07.73-.17 1.41z" />
        </svg>
      </a>
      <a
        href={telHref}
        aria-label="Call admissions"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue text-white shadow-[0_8px_22px_rgba(14,36,68,.4)] transition-transform hover:scale-105"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M6.62 10.79a15.53 15.53 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
        </svg>
      </a>
      <Link
        href={routes.enquiry}
        className="flex items-center gap-2.5 rounded-full bg-brand-yellow px-5 py-3.5 text-[14.5px] font-bold text-white shadow-[0_10px_28px_rgba(214,134,42,.42)] transition-colors hover:bg-brand-yellow-hover"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_0_3px_rgba(255,255,255,.3)]" />
        Enquire Now
      </Link>
    </div>
  );
}
