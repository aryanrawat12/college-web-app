import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/site";

export default function Hero({
  title = "Pharmacy, Management & Education — under one trusted campus.",
  subtitle = "Quality, outcomes-first education at Akhil Bharti Group of Institutes, Bhopal. Explore six AICTE, PCI & NCTE-approved programmes with transparent admissions and dedicated placement support.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[88vh] flex-col overflow-hidden"
    >
      {/* Full-bleed campus image — the star of the hero */}
      <Image
        src="/hero/slide-1.jpg"
        alt="Akhil Bharti Group of Institutes campus"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Light, left-weighted overlays so the photo stays visible */}
      <div className="absolute inset-0 -z-10 bg-brand-blue-dark/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-blue-dark/85 via-brand-blue-dark/35 to-transparent" />

      {/* Copy */}
      <div className="relative z-10 flex flex-1 items-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[12.5px] font-semibold text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_0_3px_rgba(74,222,128,.25)]" />
            Approved by AICTE &amp; PCI · Affiliated to RGPV Bhopal
          </div>
          <h1 className="font-serif text-[40px] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[56px]">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#dbe2ec]">
            {subtitle}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="#finder"
              className="rounded-xl bg-brand-yellow px-6 py-3.5 text-[15.5px] font-bold text-white shadow-[0_6px_18px_rgba(214,134,42,.4)] transition-colors hover:bg-brand-yellow-hover"
            >
              Find your programme
            </Link>
            <Link
              href={routes.enquiry}
              className="rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-[15.5px] font-bold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-brand-blue"
            >
              Talk to admissions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
