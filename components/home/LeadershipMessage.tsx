import Image from "next/image";
import Link from "next/link";
import type { SectionText } from "@/lib/queries";
import { leadershipSnippet as fallbackLeader } from "@/lib/home-data";
import { routes } from "@/lib/site";

type Leader = { name: string; role: string; message: string; image: string };

export default function LeadershipMessage({
  data = fallbackLeader,
  content,
}: {
  data?: Leader;
  content?: SectionText;
}) {
  const leadershipSnippet = data;
  const eyebrow = content ? content.eyebrow : "From the Leadership";
  return (
    <section className="bg-background">
      <div className="container-page py-16 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-border-warm-2 bg-cream-2 p-7 sm:p-10 md:grid-cols-[240px_1fr]">
          <div className="relative mx-auto aspect-[4/5] w-44 overflow-hidden rounded-2xl border border-border-warm md:mx-0 md:w-full">
            <Image
              src={leadershipSnippet.image}
              alt={`${leadershipSnippet.name}, ${leadershipSnippet.role}`}
              fill
              className="object-cover"
              sizes="240px"
            />
          </div>
          <div>
            {eyebrow && (
              <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-yellow">
                {eyebrow}
              </div>
            )}
            <blockquote className="font-serif text-xl leading-relaxed text-brand-blue sm:text-2xl">
              &ldquo;{leadershipSnippet.message}&rdquo;
            </blockquote>
            <p className="mt-5 font-semibold text-brand-blue">
              {leadershipSnippet.name}
            </p>
            <p className="text-sm text-faint">{leadershipSnippet.role}</p>
            <Link
              href={routes.leadership}
              className="mt-4 inline-flex text-sm font-bold text-brand-yellow underline-offset-4 hover:underline"
            >
              Read more from our leadership →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
