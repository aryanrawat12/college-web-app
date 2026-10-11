import PageHeaderImage from "@/components/shared/PageHeaderImage";
import { fetchPaymentLinks } from "@/lib/queries";

export const metadata = {
  title: "Fee Payment",
};

export const revalidate = 0;

const initials = (name: string) =>
  name.replace(/institute of/i, "").trim().charAt(0).toUpperCase();

export default async function PaymentPage() {
  const links = await fetchPaymentLinks();

  return (
    <>
      <PageHeaderImage title="Fee Payment" />

      <section className="container-page py-10 sm:py-12">
        <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-yellow">
          Online Fee Payment
        </div>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
          Pay your fees by institute
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Select your institute to continue to its secure payment portal. Keep
          your enrolment number and fee receipt details handy.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {links.map((p) => (
            <div
              key={p.institute}
              className="flex flex-col rounded-2xl border border-border-warm-2 bg-surface p-7 transition-shadow hover:shadow-[0_16px_38px_rgba(14,20,30,.1)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-2 font-mono text-xl font-bold text-brand-blue">
                {initials(p.institute)}
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-brand-blue">
                {p.institute}
              </h3>
              <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-muted">
                {p.description}
              </p>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-yellow px-5 py-3 text-[15px] font-bold text-white transition-colors hover:bg-brand-yellow-hover"
              >
                Pay Fees →
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-faint">
          For payment issues, contact the accounts office. Always verify the
          portal URL before entering card/UPI details.
        </p>
      </section>
    </>
  );
}
