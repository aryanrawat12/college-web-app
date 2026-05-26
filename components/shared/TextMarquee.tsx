type TextMarqueeProps = {
  text: string;
  /** When false, scrolls a single copy of the text (no duplicated content). */
  repeat?: boolean;
};

export default function TextMarquee({ text, repeat = true }: TextMarqueeProps) {
  if (!repeat) {
    return (
      <div className="overflow-hidden bg-brand-blue py-3">
        <p className="marquee-single inline-block whitespace-nowrap px-4 text-sm font-medium tracking-wide text-brand-yellow sm:text-base">
          {text}
        </p>
      </div>
    );
  }

  const repeated = `${text}   •   ${text}   •   `;

  return (
    <div className="overflow-hidden bg-brand-blue py-3">
      <div className="marquee-track flex w-max">
        <span className="px-6 text-sm font-medium tracking-wide whitespace-nowrap text-brand-yellow sm:text-base">
          {repeated}
        </span>
        <span
          className="px-6 text-sm font-medium tracking-wide whitespace-nowrap text-brand-yellow sm:text-base"
          aria-hidden
        >
          {repeated}
        </span>
      </div>
    </div>
  );
}
