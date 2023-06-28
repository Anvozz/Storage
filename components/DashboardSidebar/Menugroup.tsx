import { useDashboardContext } from "@/context/DashboardContext";

const Menugroup = () => {
  const { dashboard } = useDashboardContext();
  return (
    <p
      className={`font-semibold text-lg ${
        dashboard.isSidebarCollapse && "hidden"
      }`}
    >
      การจัดการ
    </p>
  );
};

export default Menugroup;
