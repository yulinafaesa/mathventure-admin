import AdminShell from "@/components/AdminShell";
import { DataProvider } from "@/lib/DataContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      <AdminShell>{children}</AdminShell>
    </DataProvider>
  );
}
