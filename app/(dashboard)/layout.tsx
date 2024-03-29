"use client";
import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardContextProvider, {
  useDashboardContext,
} from "@/context/DashboardContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
export const metadata = {
  title: "Storage | Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dashboard } = useDashboardContext();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/signIn");
    }
  }, [status]);

  /** Server */
  ("use server");
  return (
    <>
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        <div
          className={`mt-14 ${
            dashboard.isSidebarCollapse ? "lg:w-[96%]" : "lg:w-5/6"
          } w-screen`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
