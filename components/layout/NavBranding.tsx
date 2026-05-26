"use client";

import { usePathname } from "next/navigation";
import { getNavBranding } from "@/lib/nav-branding";

export default function NavBranding() {
  const pathname = usePathname();
  const [line1, line2, city] = getNavBranding(pathname);
  const isCompact = pathname.includes("/pharmacy");

  return (
    <div
      className={`flex h-10 flex-col justify-center leading-tight text-brand-blue ${
        isCompact ? "max-w-[140px] sm:max-w-[200px]" : "max-w-[120px] sm:max-w-[160px]"
      }`}
      aria-label={`${line1} ${line2} ${city}`}
    >
      <span
        className={`font-bold uppercase tracking-tight ${
          isCompact
            ? "text-[7px] sm:text-[8px]"
            : "text-[8px] sm:text-[9px] md:text-[10px]"
        }`}
      >
        {line1}
      </span>
      <span
        className={`font-bold uppercase tracking-tight ${
          isCompact
            ? "text-[7px] sm:text-[8px]"
            : "text-[8px] sm:text-[9px] md:text-[10px]"
        }`}
      >
        {line2}
      </span>
      <span className="text-[6px] font-semibold uppercase tracking-wide sm:text-[7px]">
        {city}
      </span>
    </div>
  );
}
