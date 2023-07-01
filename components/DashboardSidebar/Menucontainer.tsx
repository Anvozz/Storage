import { Home, User } from "lucide-react";
import MenuItems from "./MenuItems";
import Menugroup from "./Menugroup";

const MenuContainer = () => {
  return (
    <ul className="px-2 py-1 w-full min-h-screen">
      <MenuItems href="/dashboard" title="หน้าแรก" icon={<Home size={20} />} />
      <Menugroup />
      <MenuItems
        href="/manage-user"
        title="จัดการผู้ใช้"
        icon={<User size={20} />}
      />
    </ul>
  );
};

export default MenuContainer;
