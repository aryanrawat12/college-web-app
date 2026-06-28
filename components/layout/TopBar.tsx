import { tickerNotices } from "@/lib/home-data";
import { siteConfig } from "@/lib/site";

const utilLinkClass =
  "text-white/85 transition-colors hover:text-white focus-visible:text-white";

export default function TopBar() {
  // Duplicated once so the marquee loop (translateX -50%) is seamless.
  const items = [...tickerNotices, ...tickerNotices];

  return (
    <div className="bg-brand-blue-dark text-[#dfe6f2]">
      <div className="container-page flex h-10 items-center justify-between gap-6 text-[13px]">
        {/* Scrolling important-notice ticker */}
        <div
          className="relative flex h-full min-w-0 flex-1 items-center overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)",
            maskImage:
              "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)",
          }}
        >
          <ul
            className="marquee-track flex w-max items-center gap-12 whitespace-nowrap"
            aria-label="Important notices"
          >
            {items.map((notice, i) => (
              <li
                key={i}
                aria-hidden={i >= tickerNotices.length}
                className="flex items-center gap-3"
              >
                <span className="text-brand-gold-light" aria-hidden="true">
                  ✦
                </span>
                {notice}
              </li>
            ))}
          </ul>
        </div>

        {/* Utility links */}
        <nav
          className="hidden shrink-0 items-center gap-4 md:flex"
          aria-label="Top utility navigation"
        >
          <a
            href={siteConfig.studentLoginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={utilLinkClass}
          >
            Portal Login
          </a>
          <span className="text-white/25">|</span>
          <a
            href={siteConfig.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={utilLinkClass}
          >
            Fee Payment
          </a>
          <span className="text-white/25">|</span>
          <span className="text-white/85">
            Helpline{" "}
            <strong className="font-semibold text-white">
              {siteConfig.helpline}
            </strong>
          </span>
          <a
            href={siteConfig.linkedinCompanyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ABGI on LinkedIn"
            className={utilLinkClass}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06C20.4 8.58 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21H9z" />
            </svg>
          </a>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ABGI on Instagram"
            className={utilLinkClass}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.38.19-1.7.32-.43.16-.74.36-1.06.68-.32.32-.52.63-.68 1.06-.13.32-.28.8-.32 1.7C3.21 9.5 3.2 9.85 3.2 13s.01 3.5.07 4.74c.04.9.19 1.38.32 1.7.16.43.36.74.68 1.06.32.32.63.52 1.06.68.32.13.8.28 1.7.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.19 1.7-.32.43-.16.74-.36 1.06-.68.32-.32.52-.63.68-1.06.13-.32.28-.8.32-1.7.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.38-.32-1.7a2.85 2.85 0 00-.68-1.06 2.85 2.85 0 00-1.06-.68c-.32-.13-.8-.28-1.7-.32C15.5 4.01 15.15 4 12 4zm0 3.07a4.93 4.93 0 110 9.86 4.93 4.93 0 010-9.86zm0 1.8a3.13 3.13 0 100 6.26 3.13 3.13 0 000-6.26zm5.13-3.27a1.15 1.15 0 110 2.3 1.15 1.15 0 010-2.3z" />
            </svg>
          </a>
          <a
            href={siteConfig.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ABGI on YouTube"
            className={utilLinkClass}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M23.5 6.5a3 3 0 00-2.1-2.12C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.4.52A3 3 0 00.5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 002.1 2.12c1.9.52 9.4.52 9.4.52s7.5 0 9.4-.52a3 3 0 002.1-2.12C24 15.6 24 12 24 12s0-3.6-.5-5.5zM9.6 15.5v-7l6.2 3.5-6.2 3.5z" />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  );
}
