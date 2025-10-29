import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import { DashboardProvider } from "@/context/dashboardContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DashboardProvider>
          <DashboardNavbar/>
          <div className="flex w-full flex-1">
              <DashboardSidebar/>
              {children}
          </div>
        </DashboardProvider>
      </body>
    </html>
  );
}
