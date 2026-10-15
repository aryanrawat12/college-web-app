import PageHeaderImage from "@/components/shared/PageHeaderImage";
import type { AntiRaggingDocument } from "@/lib/anti-ragging-data";
import { fetchAntiRagging } from "@/lib/queries";

export const metadata = {
  title: "Anti-Ragging Cell",
  description:
    "Anti-Ragging Cell of Akhil Bharti Group of Institutes, Bhopal — committee, helplines, punishments and the anti-ragging policy.",
};

export const revalidate = 0;

const fileIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="mt-0.5 h-6 w-6 shrink-0 text-brand-yellow">
    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zM14 3v5h5M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const eyebrow = "mb-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-yellow";
const heading = "font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl";

function PointList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border-warm-2 bg-surface p-6 sm:p-7">
      <h3 className="font-serif text-xl font-bold text-brand-blue">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-muted">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-yellow" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function AntiRaggingPage() {
  const { info, members, documents } = await fetchAntiRagging();

  const byYear = new Map<string, AntiRaggingDocument[]>();
  for (const d of documents) byYear.set(d.year, [...(byYear.get(d.year) ?? []), d]);

  return (
    <>
      <PageHeaderImage title="Anti-Ragging Cell" />

      {/* Introduction */}
      <section className="container-page py-10 sm:py-12">
        <div className={eyebrow}>Zero Tolerance</div>
        <h2 className={heading}>Ragging is a punishable offence</h2>
        <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted">
          {info.intro.split(/\n\s*\n/).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      {/* Helplines */}
      <section className="bg-brand-blue-dark text-white">
        <div className="container-page grid gap-6 py-10 md:grid-cols-3">
          <div>
            <div className="text-sm text-[#b9c4d6]">National Anti-Ragging Helpline (24×7, toll free)</div>
            <a href={`tel:${info.helplinePhone.replace(/[^\d+]/g, "")}`} className="mt-1 block font-serif text-2xl font-bold text-brand-yellow hover:underline">
              {info.helplinePhone}
            </a>
          </div>
          <div>
            <div className="text-sm text-[#b9c4d6]">Helpline Email</div>
            <a href={`mailto:${info.helplineEmail}`} className="mt-1 block break-all font-serif text-xl font-bold text-white hover:underline">
              {info.helplineEmail}
            </a>
          </div>
          <div>
            <div className="text-sm text-[#b9c4d6]">
              {info.collegeContact ? "College Anti-Ragging Cell" : "Online complaint & undertaking"}
            </div>
            {info.collegeContact ? (
              <div className="mt-1 font-serif text-xl font-bold text-white">{info.collegeContact}</div>
            ) : (
              <a href="https://www.antiragging.in" target="_blank" rel="noopener noreferrer" className="mt-1 block font-serif text-xl font-bold text-white hover:underline">
                www.antiragging.in
              </a>
            )}
          </div>
        </div>
      </section>

      {/* What is ragging / punishments */}
      <section className="container-page py-10 sm:py-12">
        <div className={eyebrow}>Know the rules</div>
        <h2 className={heading}>What counts as ragging, and what follows</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <PointList title="What constitutes ragging" items={info.whatIsRagging} />
          <PointList title="Punishments" items={info.punishments} />
        </div>
        <div className="mt-6 rounded-2xl border border-brand-yellow/40 bg-brand-yellow/10 p-6 text-[15px] leading-relaxed text-foreground">
          <h3 className="font-serif text-lg font-bold text-brand-blue">Anti-ragging undertaking</h3>
          <p className="mt-2">{info.undertaking}</p>
          <a
            href="https://www.antiragging.in"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-semibold text-brand-blue underline-offset-4 hover:underline"
          >
            Submit undertaking at antiragging.in →
          </a>
        </div>
      </section>

      {/* Committee */}
      <section className="bg-cream-2">
        <div className="container-page py-10 sm:py-12">
          <div className={eyebrow}>Anti-Ragging Committee &amp; Squad</div>
          <h2 className={heading}>Committee members</h2>
          {(info.appointmentOrder || info.appointmentDate) && (
            <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
              {info.appointmentOrder && (
                <div>
                  <dt className="inline font-semibold text-foreground">Appointment order: </dt>
                  <dd className="inline">{info.appointmentOrder}</dd>
                </div>
              )}
              {info.appointmentDate && (
                <div>
                  <dt className="inline font-semibold text-foreground">Date of appointment: </dt>
                  <dd className="inline">{info.appointmentDate}</dd>
                </div>
              )}
            </dl>
          )}

          {members.length === 0 ? (
            <p className="mt-6 text-muted">Committee details will be published here soon.</p>
          ) : (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border-warm-2 bg-surface">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-brand-blue text-white">
                  <tr>
                    {["Name", "Role", "Department", "Mobile", "Email"].map((h) => (
                      <th key={h} scope="col" className="px-4 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.id} className="border-t border-border-warm-2 even:bg-tint">
                      <td className="px-4 py-3 font-semibold text-foreground">{m.name}</td>
                      <td className="px-4 py-3 text-muted">{m.role}</td>
                      <td className="px-4 py-3 text-muted">{m.department}</td>
                      <td className="px-4 py-3">
                        {m.mobile && (
                          <a href={`tel:${m.mobile.replace(/[^\d+]/g, "")}`} className="text-brand-blue hover:underline">
                            {m.mobile}
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {m.email && (
                          <a href={`mailto:${m.email}`} className="break-all text-brand-blue hover:underline">
                            {m.email}
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Document archive */}
      {documents.length > 0 && (
        <section className="container-page py-10 sm:py-12">
          <div className={eyebrow}>Archive</div>
          <h2 className={heading}>Notices &amp; documents</h2>
          <div className="mt-8 space-y-8">
            {[...byYear].map(([year, docs]) => (
              <div key={year}>
                <h3 className="mb-3 font-serif text-xl font-bold text-brand-blue">{year}</h3>
                <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {docs.map((d) => (
                    <li key={d.id}>
                      <a
                        href={d.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 rounded-xl border border-border-warm-2 bg-surface p-4 transition-colors hover:border-brand-blue"
                      >
                        {fileIcon}
                        <span className="font-semibold text-foreground">{d.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Download — always the last section */}
      <section className="container-page pb-14 pt-4">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-brand-blue-dark p-7 text-white sm:flex-row sm:items-center sm:p-9">
          <div>
            <h2 className="font-serif text-2xl font-bold">Anti-Ragging Policy</h2>
            <p className="mt-1 text-[#b9c4d6]">
              {info.pdfUrl
                ? "Download the complete policy, committee order and guidelines."
                : "The policy document will be available for download soon."}
            </p>
          </div>
          {info.pdfUrl && (
            <a
              href={info.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-yellow px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-brand-yellow-hover"
            >
              {info.pdfLabel} ↓
            </a>
          )}
        </div>
      </section>
    </>
  );
}
