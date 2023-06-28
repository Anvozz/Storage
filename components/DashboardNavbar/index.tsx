"use client";
import { useDashboardContext } from "@/context/DashboardContext";
import AvatarDropdown from "./AvatarDropdown";
import DashboardToggle from "./DashboardToggle";

const DashboardNavbar = () => {
  const { dashboard, dashboardAction } = useDashboardContext();
  return (
    <nav className="border-b fixed bg-background/95 w-full">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex justify-center items-center">
          <p className="font-bold">STORAGE</p>
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
