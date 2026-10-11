import PageHeaderImage from "@/components/shared/PageHeaderImage";
import { fetchPolicies, type Policy } from "@/lib/queries";

export const metadata = {
  title: "Policies",
  description: "Institutional policies of Akhil Bharti Group of Institutes.",
};

export const revalidate = 0;

export default async function PoliciesPage() {
  const policies = await fetchPolicies();
  const groups = new Map<string, Policy[]>();
  for (const p of policies) groups.set(p.category, [...(groups.get(p.category) ?? []), p]);

  return (
    <>
      <PageHeaderImage title="Policies" />
      <section className="container-page py-10 sm:py-12">
        {policies.length === 0 ? (
          <p className="text-lg text-muted">Policy documents will be published here soon.</p>
        ) : (
          <div className="space-y-10">
            {[...groups].map(([category, items]) => (
              <div key={category}>
                <h2 className="mb-4 font-serif text-2xl font-bold tracking-tight text-brand-blue">
                  {category}
                </h2>
                <ul className="grid gap-4 md:grid-cols-2">
                  {items.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-start justify-between gap-4 rounded-xl border border-border-warm-2 bg-surface p-5"
                    >
                      <div className="flex gap-3">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="mt-0.5 h-6 w-6 shrink-0 text-brand-yellow">
                          <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zM14 3v5h5M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>
                          <h3 className="font-semibold text-foreground">{p.title}</h3>
                          {p.description && (
                            <p className="mt-1 text-sm text-muted">{p.description}</p>
                          )}
                        </div>
                      </div>
                      <a
                        href={p.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-lg bg-brand-blue px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-blue-dark"
                      >
                        View PDF
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
