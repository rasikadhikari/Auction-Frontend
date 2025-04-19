// components/SidebarItem.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 rounded cursor-pointer ${
        isActive
          ? "bg-green-100 text-green-800 font-medium"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Link>
  );
};

export default SidebarItem;
