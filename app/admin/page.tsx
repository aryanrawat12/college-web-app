import { redirect } from "next/navigation";
import AdminApp from "@/components/admin/AdminApp";
import { getServerAuthClient } from "@/lib/supabase-auth";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Server-side gate (defence in depth alongside the middleware redirect).
  const supabase = await getServerAuthClient();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/admin/login");
  }
  return <AdminApp />;
}
