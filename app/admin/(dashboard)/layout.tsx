import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ok = await isAuthenticated();
  if (!ok) redirect("/admin/login");

  return <AdminShell>{children}</AdminShell>;
}
