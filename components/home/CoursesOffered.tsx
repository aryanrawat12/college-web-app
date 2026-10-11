import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/ContentSection";
import { departmentCourses } from "@/lib/home-data";

export default function CoursesOffered() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <SectionHeading>Courses Offered</SectionHeading>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {departmentCourses.map((dept) => (
          <Link
            key={dept.title}
            href={dept.href}
            className="group flex flex-col overflow-hidden rounded-xl border border-brand-blue/10 bg-white shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="relative h-44 w-full sm:h-48">
              <Image
                src={dept.image}
                alt={dept.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex min-h-[130px] flex-1 flex-col justify-center px-4 py-4">
              <p className="text-xs leading-snug text-brand-blue sm:text-sm">
                {dept.programmes}
              </p>
              <h3 className="mt-2 font-serif text-xl font-semibold text-brand-blue group-hover:text-brand-yellow sm:text-2xl">
                {dept.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
