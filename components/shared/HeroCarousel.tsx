"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const defaultSlides = [
  "/hero/slide-1.jpg",
  "/hero/slide-2.jpg",
  "/hero/slide-3.jpg",
];

type HeroOverlay = {
  heading: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type HeroCarouselProps = {
  slides?: string[];
  autoPlayMs?: number;
  overlay?: HeroOverlay;
};

export default function HeroCarousel({
  slides = defaultSlides,
  autoPlayMs = 5000,
  overlay,
}: HeroCarouselProps) {
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length],
  );

  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  useEffect(() => {
    // Honor prefers-reduced-motion: don't auto-advance.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, autoPlayMs);
    return () => clearInterval(timer);
  }, [slides.length, autoPlayMs]);

  return (
    <section
      className="relative w-full overflow-hidden bg-brand-blue"
      style={{ height: "60vh", minHeight: "280px", maxHeight: "560px" }}
      aria-roledescription="carousel"
      aria-label="Campus highlights"
    >
      {slides.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={src}
            alt={`Campus highlight ${i + 1}`}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-blue/45" />
        </div>
      ))}

      {overlay && (
        <div className="pointer-events-none absolute inset-0 z-[5] flex items-center">
          <div className="container-page">
            <div className="pointer-events-auto max-w-2xl text-white">
              <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                {overlay.heading}
              </h1>
              {overlay.subtext && (
                <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">
                  {overlay.subtext}
                </p>
              )}
              {overlay.ctaLabel && overlay.ctaHref && (
                <Link
                  href={overlay.ctaHref}
                  className="mt-6 inline-flex rounded-md bg-brand-yellow px-6 py-3 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-yellow-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {overlay.ctaLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={goPrev}
        className="absolute top-1/2 left-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-blue/80 text-white shadow-lg transition-colors hover:bg-brand-yellow hover:text-brand-blue sm:left-6 sm:h-12 sm:w-12"
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={goNext}
        className="absolute top-1/2 right-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-blue/80 text-white shadow-lg transition-colors hover:bg-brand-yellow hover:text-brand-blue sm:right-6 sm:h-12 sm:w-12"
        aria-label="Next slide"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-[width,background-color] ${
              i === index
                ? "w-8 bg-brand-yellow"
                : "w-2.5 bg-white/70 hover:bg-white"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </section>
  );
}
