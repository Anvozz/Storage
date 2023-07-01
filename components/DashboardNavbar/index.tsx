"use client";
import { useDashboardContext } from "@/context/DashboardContext";
import AvatarDropdown from "./AvatarDropdown";
import DashboardToggle from "./DashboardToggle";
import { Box } from "lucide-react";
import Link from "next/link";

const DashboardNavbar = () => {
  const { dashboard, dashboardAction } = useDashboardContext();
  return (
    <nav className="border-b fixed bg-background/95 w-full">
      <div className="px-3 flex h-14 items-center justify-between">
        <div className="flex justify-center items-center">
          <Link href={"/dashboard"}>
            <p className="font-bold flex">
              <Box /> STORAGE
            </p>
          </Link>
          <DashboardToggle
            isOpen={dashboard.isSidebarCollapse}
            onClick={dashboardAction.setSidebarCollapse}
            classNames="hidden lg:block"
          />
          <DashboardToggle
            isOpen={dashboard.isModalsidebarOpen}
            onClick={dashboardAction.setModalToggle}
            classNames="block lg:hidden"
          />
        </div>
        <AvatarDropdown />
      </div>
    </nav>
  );
};

export default DashboardNavbar;
