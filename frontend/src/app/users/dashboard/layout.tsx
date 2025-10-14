import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DashboardNavbar/>
        <div className="flex w-full flex-1">
            <DashboardSidebar/>
            {children}
        </div>
      </body>
    </html>
  );
}
