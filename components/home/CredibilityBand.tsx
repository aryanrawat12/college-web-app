import CountUp from "@/components/shared/CountUp";
import { accreditations as fallbackAccreditations } from "@/lib/home-data";
import { heroStats as fallbackStats } from "@/lib/home-data";

type Stat = { value: string; label: string };
type Logo = { abbr: string; name: string; logo: string | null };

export default function CredibilityBand({
  stats = fallbackStats,
  accreditations = fallbackAccreditations,
}: {
  stats?: Stat[];
  accreditations?: Logo[];
}) {
  const withLogos = accreditations.filter((a) => a.logo);

  return (
    <section
      aria-label="Key figures and approvals"
      className="bg-brand-blue-dark text-white"
    >
      <div className="container-page space-y-8 py-10 sm:py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center ${
                i < stats.length - 1 ? "md:border-r md:border-white/10" : ""
              }`}
            >
              <CountUp
                value={s.value}
                className="block font-serif text-3xl font-bold leading-none text-white sm:text-[38px]"
                style={{ fontVariantNumeric: "tabular-nums" }}
              />
              <div className="mt-2 text-[13px] font-medium text-[#aebbd0]">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Approvals — logos sit directly on the navy band (monochrome white) */}
        {withLogos.length > 0 && (
          <div className="border-t border-white/10 pt-7">
            <div className="text-center font-mono text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#9fb0cc]">
              Approved &amp; affiliated by
            </div>
            <div className="mx-auto mt-5 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:justify-between">
              {withLogos.map((a) => (
                <div
                  key={a.abbr}
                  className="flex items-center gap-3 opacity-80 transition-opacity hover:opacity-100"
                  title={a.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.logo as string}
                    alt={`${a.name} logo`}
                    className="h-12 w-12 object-contain"
                    loading="lazy"
                  />
                  <span
                    className="font-mono text-[14px] font-bold tracking-tight text-white"
                    translate="no"
                  >
                    {a.abbr}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
