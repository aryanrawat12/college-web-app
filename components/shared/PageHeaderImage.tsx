type PageHeaderImageProps = {
  title: string;
  imageSrc?: string;
};

export default function PageHeaderImage({
  title,
  imageSrc = "/headers/header.jpg",
}: PageHeaderImageProps) {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${imageSrc})`,
        height: "40vh",
        minHeight: "220px",
        maxHeight: "420px",
      }}
      aria-label={title}
    >
      <div className="absolute inset-0 bg-brand-blue/55" />
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <h1 className="max-w-3xl font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
