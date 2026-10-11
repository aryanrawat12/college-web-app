import { redirect } from "next/navigation";
import AdminLogin from "@/components/admin/AdminLogin";
import { getServerAuthClient } from "@/lib/supabase-auth";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const supabase = await getServerAuthClient();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect("/admin");
  }
  return <AdminLogin />;
}
