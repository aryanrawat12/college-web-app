import Link from "next/link";
import { routes } from "@/lib/site";

export default function CopyRights() {
  return (
    <div className="border-t border-white/10 bg-brand-navy-deep text-[#6f82a3]">
      <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-[12.5px] sm:flex-row">
        <span>
          &copy; 2026 Akhil Bharti Group of Institutes · Affiliated to RGPV,
          Bhopal · Approved by AICTE &amp; PCI
        </span>
        <span className="flex gap-5">
          <Link href={routes.mandatoryDisclosures} className="hover:text-white">
            Disclosures
          </Link>
          <Link href={routes.approvals} className="hover:text-white">
            Approvals
          </Link>
          <Link href={routes.choupal} className="hover:text-white">
            Anti-Ragging
          </Link>
          <Link href={routes.privacy} className="hover:text-white">
            Privacy
          </Link>
          <Link href={routes.terms} className="hover:text-white">
            Terms
          </Link>
        </span>
      </div>
    </div>
  );
}
