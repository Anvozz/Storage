import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardContextProvider from "@/context/DashboardContext";

export const metadata = {
  title: "Storage | Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardContextProvider>
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        <div className="ml-10 mt-14 w-full">{children}</div>
      </div>
    </DashboardContextProvider>
  );
}
