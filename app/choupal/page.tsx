import ChoupalForm from "@/components/forms/ChoupalForm";

export const metadata = {
  title: "Choupal | ABGI",
  description: "Submit a grievance at Akhil Bharti Group of Institutes",
};

export default function ChoupalPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-280px)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <ChoupalForm />
    </section>
  );
}
