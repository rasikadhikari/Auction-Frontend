// components/SellerSidebar.jsx

import React from "react";
import {
  FaTrophy,
  FaHeart,
  FaUser,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";

const SellerSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

    navigate("/user/login"); // or use "/admin/login" if you have a separate admin login page
  };
  return (
    <aside className="w-full md:w-1/4 bg-white p-6 shadow-md border-r rounded-2xl">
      {/* Profile */}
      <div className="flex flex-col items-center mb-10">
        <img
          src="https://i.ibb.co/ZYW3VTp/brown-brim.png"
          alt="profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="font-semibold text-lg">Test User</h2>
        <p className="text-sm text-gray-500">test@gmail.com</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-3 w-full">
        <SidebarItem icon="📊" label="Dashboard" to="/seller" />
        <SidebarItem icon="📦" label="My Products" to="/sellerproduct" />

        <SidebarItem
          icon={<FaPlus />}
          label="Create Product"
          to="/createproduct"
        />
        <SidebarItem icon={<FaTrophy />} label="Sold Bids" to="/soldproduct" />
        <SidebarItem
          icon={<FaHeart />}
          label="My Favorites"
          to="/underconstruction"
        />
        <SidebarItem
          icon={<FaUser />}
          label="Personal Profile"
          to="/editprofile"
        />
      </nav>

      <button
        onClick={handleLogout}
        className="mt-10 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        <FaSignOutAlt /> Log Out
      </button>
    </aside>
  );
};

export default SellerSidebar;
