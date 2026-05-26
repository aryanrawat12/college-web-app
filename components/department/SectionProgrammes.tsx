import type { ReactNode } from "react";
import ContentSection from "@/components/shared/ContentSection";

type SectionProgrammesProps = {
  heading?: string;
  children: ReactNode;
};

export default function SectionProgrammes({
  heading = "Programme Offered",
  children,
}: SectionProgrammesProps) {
  return <ContentSection heading={heading}>{children}</ContentSection>;
}
