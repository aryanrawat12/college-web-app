import Link from "next/link";
import JobApplicationForm from "@/components/forms/JobApplicationForm";
import { fetchJobs } from "@/lib/queries";
import { routes } from "@/lib/site";

export const metadata = {
  title: "Apply for a Job",
  description: "Apply for a job at Akhil Bharti Group of Institutes.",
};

export const revalidate = 0;

export default async function CareersApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [jobs, { job }] = await Promise.all([fetchJobs(), searchParams]);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-280px)] max-w-7xl flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {jobs.length === 0 ? (
        <p className="text-lg text-muted">
          There are no open positions right now.{" "}
          <Link href={routes.careers} className="font-semibold text-brand-blue hover:underline">
            Back to Careers
          </Link>
        </p>
      ) : (
        <JobApplicationForm
          jobs={jobs.map((j) => ({ id: j.id, title: j.title }))}
          initialJobId={Number(job) || undefined}
        />
      )}
    </section>
  );
}
