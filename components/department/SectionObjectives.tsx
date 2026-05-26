import type { ReactNode } from "react";
import ContentSection from "@/components/shared/ContentSection";

export default function SectionObjectives({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ContentSection heading="Objectives" className="bg-brand-blue/[0.03]">
      {children}
    </ContentSection>
  );
}
