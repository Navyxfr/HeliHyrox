import { AdminNav } from "@/components/AdminNav";
import { requireAdminUser } from "@/lib/adminAuth";

export default async function ProtectedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdminUser();

  return (
    <>
      <AdminNav />
      {children}
    </>
  );
}
