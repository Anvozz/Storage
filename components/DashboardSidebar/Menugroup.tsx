import { useDashboardContext } from "@/context/DashboardContext";

const Menugroup = () => {
  const { dashboard } = useDashboardContext();
  return (
    <p
      className={`font-bold text-lg ${dashboard.isSidebarCollapse && "hidden"}`}
    >
      การจัดการ
    </p>
  );
};

export default Menugroup;
