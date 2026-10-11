"use client";

import { useEffect, useRef, useState } from "react";

// Animate the numeric part of a stat string from 0 to its value when it
// scrolls into view. Handles prefixes/suffixes and separators, e.g.
// "2,500+", "85%", "₹6.5 LPA", "2010", "15+". Non-numeric strings render as-is.
// ponytail: en-IN grouping only re-added when the source value had commas —
// keeps plain years like "2010" from becoming "2,010".
function format(n: number, raw: string): string {
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const fixed = n.toFixed(decimals);
  if (!raw.includes(",")) return fixed;
  const [int, dec] = fixed.split(".");
  const grouped = Number(int).toLocaleString("en-IN");
  return dec ? `${grouped}.${dec}` : grouped;
}

export default function CountUp({
  value,
  className,
  style,
}: {
  value: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/[\d,]*\.?\d+/);
    const el = ref.current;
    if (!match || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const raw = match[0];
    const target = parseFloat(raw.replace(/,/g, ""));
    setDisplay(value.replace(raw, format(0, raw))); // start at zero, wait for view

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const dur = 1400;
        let start: number | null = null;
        const step = (t: number) => {
          start ??= t;
          const p = Math.min((t - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(p < 1 ? value.replace(raw, format(target * eased, raw)) : value);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
