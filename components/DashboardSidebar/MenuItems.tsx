import { useDashboardContext } from "@/context/DashboardContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItemsPropsType = {
  title: string;
  icon?: React.ReactNode;
  href: string;
};

const MenuItems = ({ icon, title, href }: MenuItemsPropsType) => {
  const { dashboard } = useDashboardContext();
  const currentPath = usePathname();
  return (
    <li className="h-10">
      <Link
        href={href}
        className={`group flex space-x-1 hover:bg-gray-100 hover:font-bold hover:stroke-2 rounded-md p-1 ${
          dashboard.isSidebarCollapse && "justify-center"
        } items-center ${currentPath === href && "bg-gray-100 font-bold"}`}
      >
        <div className="group-hover:stroke-white">{icon}</div>
        <p
          className={`text-md ${
            dashboard.isSidebarCollapse ? "hidden" : "block"
          }`}
        >
          {title}
        </p>
      </Link>
    </li>
  );
};

export default MenuItems;
