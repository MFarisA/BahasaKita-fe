import React, { useState } from "react";
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
  { name: "Lessons", label: "Pelajaran" },
  { name: "My Progress", label: "Progres Saya" },
  { name: "Cultural Content", label: "Konten Budaya" },
];

const NavbarHome: React.FC<NavbarProps> = ({
  activeMenu,
  setActiveMenu,
  notifications = [],
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <header
      className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 mb-8 bg-white rounded-xl p-4 md:p-6 shadow-sm transition-all duration-300 z-30 sticky top-0"
      style={{ top: 20 }}
      id="main-header"
    >
      <section className="container mx-auto">
        {/* Mobile Layout */}
        <div className="flex md:hidden items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={48}
              height={32}
              className="w-12 h-auto"
            />
            <h2 className="text-xl font-bold text-indigo-900">Bahasa Kita</h2>
          </div>
          {/* Hamburger button for mobile */}
          <button
            className="flex items-center px-2 py-1"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7 text-indigo-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Desktop Layout - 3 sections */}
        <div className="hidden md:flex w-full items-center justify-between">
          {/* Left section - Logo */}
          <div className="flex items-center gap-2 md:gap-4">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={60}
              height={40}
              className="md:w-[85.82px] md:h-[56px]"
            />
            <h2 className="text-xl md:text-2xl font-bold text-indigo-900">
              Bahasa Kita
            </h2>
          </div>

          {/* Center section - Navigation Menu */}
          <nav className="flex items-center gap-10 flex-grow justify-center">
            {menus.map((menu) => (
              <Link
                href={
                  menu.name === "My Progress"
                    ? "/?route=progress-dashboard"
                    : menu.name === "Lessons"
                    ? "/?route=home"
                    : menu.name === "Cultural Content"
                    ? "/?route=culture-content"
                    : "#"
                }
                key={menu.name}
                className={`text-md text-indigo-900 ${
                  activeMenu === menu.name ? "font-bold" : "font-normal"
                } hover:font-bold transition-all duration-200`}
                onClick={() => setActiveMenu(menu.name)}
              >
                {menu.label}
              </Link>
            ))}
          </nav>

          {/* Right section - Language, Notifications, Settings */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Language Button */}
            <button className="flex items-center gap-2 px-3 py-1 rounded-lg border border-indigo-300 bg-white text-indigo-900 hover:bg-indigo-50 transition text-base">
              <Image
                src="/images/indonesia.png"
                alt=""
                width={24}
                height={16}
                className="w-6 h-auto"
              />
              <span className="font-medium">Language</span>
            </button>
            <NotificationsMenu notifications={notifications} />
            <SettingsMenu />
          </div>
        </div>

        {/* Mobile Menu */}
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:hidden flex-col items-center gap-4 w-full mt-2`}
        >
          <div className="flex flex-col items-center gap-4 px-4">
            {menus.map((menu) => (
              <Link
                href={
                  menu.name === "My Progress"
                    ? "/?route=progress-dashboard"
                    : menu.name === "Lessons"
                    ? "/?route=home"
                    : menu.name === "Cultural Content"
                    ? "/?route=culture-content"
                    : "#"
                }
                key={menu.name}
                className={`text-md text-indigo-900 ${
                  activeMenu === menu.name ? "font-bold" : "font-normal"
                } hover:font-bold`}
                onClick={() => {
                  setActiveMenu(menu.name);
                  setMenuOpen(false); // close menu on mobile after click
                }}
              >
                {menu.label}
              </Link>
            ))}
          </div>

          {/* Mobile Right section */}
          <div className="flex items-center gap-4 mt-2 px-4">
            {/* Language Button */}
            <button className="flex items-center gap-2 px-2 py-1 rounded-lg border border-indigo-300 bg-white text-indigo-900 hover:bg-indigo-50 transition text-sm">
              <Image
                src="/images/indonesia.png"
                alt=""
                width={24}
                height={16}
                className="w-6 h-auto"
              />
              <span className="font-medium">Language</span>
            </button>
            <NotificationsMenu notifications={notifications} />
            <SettingsMenu />
          </div>
        </nav>
      </section>
    </header>
  );
};

export default NavbarHome;
