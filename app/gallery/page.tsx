import Image from "next/image";
import PageHeaderImage from "@/components/shared/PageHeaderImage";

export const metadata = {
  title: "Gallery",
  description: "Campus glimpses from Akhil Bharti Group of Institutes, Bhopal.",
};

// Glimpses composed from bundled campus imagery.
// TODO: client to replace/extend with an official campus photo set.
const photos = [
  { src: "/hero/slide-1.jpg", alt: "Campus view" },
  { src: "/hero/slide-2.jpg", alt: "Students on campus" },
  { src: "/hero/slide-3.jpg", alt: "Campus building" },
  { src: "/dept/pharmacy-dept.jpg", alt: "Pharmacy department" },
  { src: "/dept/management-dept.jpg", alt: "Management department" },
  { src: "/dept/education-dept.jpg", alt: "Education department" },
  { src: "/events/event-1.jpg", alt: "Campus event" },
  { src: "/events/event-2.jpg", alt: "Campus event" },
  { src: "/events/event-3.jpg", alt: "Campus event" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHeaderImage title="Campus Gallery" />

      <section className="container-page py-10 sm:py-12">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {photos.map((photo, i) => (
            <li
              key={`${photo.src}-${i}`}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-brand-blue/10"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading={i < 3 ? undefined : "lazy"}
                className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
