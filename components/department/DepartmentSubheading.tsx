import type { ReactNode } from "react";

export default function DepartmentSubheading({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <h3 className="mt-6 mb-2 text-lg font-semibold text-brand-blue">{children}</h3>
  );
}
