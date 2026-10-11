import EnquiryForm from "@/components/forms/EnquiryForm";

export const metadata = {
  title: "Enquiry",
  description: "Apply to Akhil Bharti Group of Institutes",
};

export default function EnquiryPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-280px)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <EnquiryForm />
    </section>
  );
}
