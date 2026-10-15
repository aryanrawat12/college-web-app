import Link from "next/link";
import PageHeaderImage from "@/components/shared/PageHeaderImage";
import { studentsMenu } from "@/lib/nav";
import { fetchNavMenu } from "@/lib/queries";

export const metadata = {
  title: "Student Corner",
};

export const revalidate = 0;

export default async function StudentsPage() {
  // Same links as the header's "Students" dropdown (admin → Header Menu).
  const menu = await fetchNavMenu();
  const group = menu.find(
    (e) => e.kind === "group" && e.group.label.toLowerCase() === "students",
  );
  const links = group?.kind === "group" ? group.group.items : studentsMenu.items;

  return (
    <>
      <PageHeaderImage title="Student Corner" />

      <section className="container-page py-10 sm:py-12">
        <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-yellow">
          For Students
        </div>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
          Everything you need, in one place
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Upload your admission documents and submit your ID card details.
          Keep your enrolment number handy.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {links.map((l) => (
            <div
              key={`${l.label}:${l.href}`}
              className="flex flex-col rounded-2xl border border-border-warm-2 bg-surface p-7 transition-shadow hover:shadow-[0_16px_38px_rgba(14,20,30,.1)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-2 font-mono text-xl font-bold text-brand-blue">
                {l.label.charAt(0).toUpperCase()}
              </div>
              <h3 className="mt-4 flex-1 font-serif text-xl font-bold text-brand-blue">
                {l.label}
              </h3>
              <Link
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-yellow px-5 py-3 text-[15px] font-bold text-white transition-colors hover:bg-brand-yellow-hover"
              >
                Open →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
