import type { ReactNode } from "react";
import ContentSection from "@/components/shared/ContentSection";

export default function SectionOverview({ children }: { children: ReactNode }) {
  return <ContentSection heading="Overview">{children}</ContentSection>;
}
