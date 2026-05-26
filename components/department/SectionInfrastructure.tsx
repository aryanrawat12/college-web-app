import type { ReactNode } from "react";
import ContentSection from "@/components/shared/ContentSection";

export default function SectionInfrastructure({
  children,
}: {
  children: ReactNode;
}) {
  return <ContentSection heading="Infrastructure">{children}</ContentSection>;
}
