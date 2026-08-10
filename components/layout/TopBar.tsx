import Image from "next/image";
import Link from "next/link";
import { routes, siteConfig } from "@/lib/site";

const topLinkClass =
  "text-sm font-medium text-white transition-colors hover:text-brand-yellow";

export default function TopBar() {
  return (
    <div className="bg-brand-blue text-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
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
            priority
            sizes="40px"
          />
        </Link>

        <nav
          className="flex flex-wrap items-center justify-end gap-4 sm:gap-6"
          aria-label="Top utility navigation"
        >
          <Link href={routes.newsTracker} className={topLinkClass}>
            News Tracker
          </Link>
          <Link href={routes.contactUs} className={topLinkClass}>
            Contact Us
          </Link>
          <a
            href={siteConfig.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={topLinkClass}
          >
            Payment
          </a>
          <a
            href={siteConfig.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-brand-yellow px-4 py-1.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-yellow-hover"
          >
            Login
          </a>
        </nav>
      </div>
    </div>
  );
}
