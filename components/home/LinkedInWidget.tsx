"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site";

declare global {
  interface Window {
    IN?: { parse: () => void };
  }
}

export default function LinkedInWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const loadWidget = () => {
      container.innerHTML = "";
      const widget = document.createElement("script");
      widget.type = "IN/CompanyProfile";
      widget.setAttribute("data-id", siteConfig.linkedinCompanyUrl);
      widget.setAttribute("data-format", "inline");
      widget.setAttribute("data-related", "false");
      widget.setAttribute("data-width", "100%");
      container.appendChild(widget);
      window.IN?.parse();
    };

    const existing = document.querySelector(
      'script[src="https://platform.linkedin.com/in.js"]',
    );

    if (existing) {
      loadWidget();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/in.js";
    script.async = true;
    script.text = "lang: en_US";
    script.onload = loadWidget;
    document.body.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div className="flex h-full min-h-[160px] flex-col overflow-hidden rounded-lg border border-brand-blue/15 bg-white shadow-sm">
      <h3 className="border-b border-brand-blue/10 bg-brand-blue px-4 py-3 text-center text-sm font-semibold text-white sm:text-base">
        LinkedIn Feed
      </h3>
      <div className="flex-1 overflow-y-auto p-3">
        <div ref={containerRef} className="min-h-[120px]" />
        <p className="mt-3 text-center text-xs text-foreground/60">
          <a
            href={siteConfig.linkedinCompanyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue underline-offset-2 hover:text-brand-yellow hover:underline"
          >
            View full feed on LinkedIn
          </a>
        </p>
      </div>
    </div>
  );
}
