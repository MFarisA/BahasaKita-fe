import React from "react";
import Link from "next/link";
import Image from "next/image";
import NotificationsMenu from "./NotificationsMenu";
import SettingsMenu from "./SettingsMenu";

interface NavbarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  notifications?: Array<{
    id: string;
    title: string;
    message: string;
    read: boolean;
    type: "achievement" | "reminder" | "system";
  }>;
}

const menus = [
  { name: "Lessons", label: "Lessons" },
  { name: "My Progress", label: "My Progress" },
  { name: "Tentang Kita", label: "Tentang Kita" },
  { name: "Community", label: "Community" },
];

const NavbarHome: React.FC<NavbarProps> = ({
  activeMenu,
  setActiveMenu,
  notifications = [],
}) => {
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <header
        className={`flex justify-between items-center mb-8 bg-white rounded-xl p-4 shadow-sm transition-all duration-300 z-30
        sticky top-0 ${typeof window !== "undefined" && window.scrollY > 0 ? "" :""}`}
        style={{ top: 20 }}
        id="main-header"
      >
      <div className="flex items-center gap-4">
        <Image src="/images/logo.svg" alt="Logo" width={85.82} height={56} />
        <h2 className="text-2xl font-bold text-indigo-900">Bahasa Kita</h2>
      </div>
      <div className="flex items-center gap-10">
        {menus.map((menu) => (
          <Link
            href="#"
            key={menu.name}
            className={`text-md text-indigo-900 ${
              activeMenu === menu.name ? "font-bold" : "font-normal"
            } hover:font-bold`}
            onClick={() => setActiveMenu(menu.name)}
          >
            {menu.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <NotificationsMenu notifications={notifications} />
        <SettingsMenu />
      </div>
    </header>
  );
};

export default NavbarHome;
