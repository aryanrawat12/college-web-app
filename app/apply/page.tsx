import ApplicationForm from "@/components/forms/ApplicationForm";
import PageHeaderImage from "@/components/shared/PageHeaderImage";

export const metadata = {
  title: "Apply Online",
};

export default function ApplyPage() {
  return (
    <>
      <PageHeaderImage title="Apply Online" />
      <section className="container-page py-10 sm:py-12">
        <p className="mx-auto mb-8 max-w-2xl text-center text-base leading-relaxed text-muted">
          Start your application to Akhil Bharti Group of Institutes. Fill in your
          details and our admissions team will get in touch to guide you through
          counselling, document verification and fee payment.
        </p>
        <ApplicationForm />
      </section>
    </>
  );
}
