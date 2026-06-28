import Link from "next/link";
import { routes, siteConfig } from "@/lib/site";

// Replaces the old LinkedIn JS-plugin feed (deprecated by LinkedIn + blocked by
// frame-ancestors CSP — it only ever rendered an empty box). A static, on-brand
// "stay connected" card instead.
export default function ConnectCard() {
  return (
    <div className="flex h-[400px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-blue to-brand-blue-dark p-6 text-white">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
          <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06C20.4 8.58 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21H9z" />
        </svg>
      </div>
      <h3 className="mt-4 font-serif text-xl font-semibold">Stay connected</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-[#b9c4d6]">
        Follow ABGI for campus updates, placement news, events and admission
        announcements as they happen.
      </p>

      <a
        href={siteConfig.linkedinCompanyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-yellow px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-yellow-hover"
      >
        Follow on LinkedIn →
      </a>

      <div className="mt-auto space-y-3 border-t border-white/10 pt-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#9fb0cc]">
            Admissions Helpline
          </span>
          <span className="text-sm font-bold text-white">
            {siteConfig.helpline}
          </span>
        </div>
        <Link
          href={routes.enquiry}
          className="flex items-center justify-between rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
        >
          Start your application
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
