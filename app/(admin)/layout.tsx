import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { DataProvider } from "@/lib/DataContext";
import { Toast } from "@/components/crud/ui";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      <div className="shell">
        <Sidebar />
        <div className="main">
          <Topbar />
          <div className="content">
            <div className="crud">
              {children}
              <Toast />
            </div>
          </div>
        </div>
      </div>
    </DataProvider>
  );
}
