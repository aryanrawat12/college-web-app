const MAP_QUERY = encodeURIComponent(
  "Manuabhan Ki Tekri, Bhopal, Madhya Pradesh",
);

export default function ContactMap() {
  return (
    <section className="w-full" aria-label="Campus location map">
      <iframe
        title="ABGI location — Manuabhan Ki Tekri, Bhopal"
        src={`https://maps.google.com/maps?q=${MAP_QUERY}&hl=en&z=15&output=embed`}
        className="h-[400px] w-full border-0 sm:h-[450px] lg:h-[500px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </section>
  );
}
