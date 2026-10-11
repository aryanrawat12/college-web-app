import IdCardForm from "@/components/forms/IdCardForm";

export const metadata = {
  title: "ID Card Details",
  description: "Submit your details for the student ID card.",
};

export default function IdCardPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-280px)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <IdCardForm />
    </section>
  );
}
