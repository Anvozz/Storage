"use client";

import { useDashboardContext } from "@/context/DashboardContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import MenuContainer from "./Menucontainer";

const DashboardSidebar = () => {
  const { dashboard, dashboardAction } = useDashboardContext();
  return (
    <>
      <div
        className={` bg-background/95 ${
          dashboard.isSidebarCollapse ? "w-14" : "w-[250px]"
        } min-h-screen hidden lg:block`}
      >
        <div
          className={`fixed mt-[3.5rem] border-r ${
            dashboard.isSidebarCollapse ? "w-14" : "w-[250px]"
          }`}
        >
          <MenuContainer />
        </div>
      </div>
      <Sheet
        open={dashboard.isModalsidebarOpen}
        onOpenChange={() =>
          dashboardAction.setModalToggle(!dashboard.isModalsidebarOpen)
        }
      >
        <SheetContent side={"left"} className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>STORAGE</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default DashboardSidebar;
