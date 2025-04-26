import React from "react";
import {
  FaUsers,
  FaBoxOpen,
  FaTags,
  FaDollarSign,
  FaUserShield,
  FaSignOutAlt,
  FaTrophy,
  FaHeart,
  FaUser,
  FaPlus,
} from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage or token
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

    // Redirect to login
    navigate("/user/login"); // or use "/admin/login" if you have a separate admin login page
  };

  return (
    <aside className="w-full md:w-1/4 bg-white p-6 shadow-md border-r rounded-2xl">
      {/* Admin Profile */}
      <div className="flex flex-col items-center mb-10">
        <img
          src="https://i.ibb.co/ZYW3VTp/brown-brim.png"
          alt="admin-profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="font-semibold text-lg">Admin User</h2>
        <p className="text-sm text-gray-500">admin@gmail.com</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-3 w-full">
        <SidebarItem
          icon={<FaUserShield />}
          label="Dashboard"
          to="/admin/dashboard"
        />
        <SidebarItem
          icon={<FaUsers />}
          label="All Users"
          to="/admin/userdetail"
        />
        <SidebarItem
          icon={<FaBoxOpen />}
          label="All Products"
          to="/admin/viewproduct"
        />
        <SidebarItem icon="📦" label="My Products" to="/admin/adminproduct" />
        <SidebarItem
          icon={<FaTags />}
          label="Categories"
          to="/admin/category"
        />
        <SidebarItem
          icon={<FaPlus />}
          label="Create Product"
          to="/admin/createproduct"
        />
        <SidebarItem
          icon={<FaDollarSign />}
          label="Income"
          to="/admin/commissionverify"
        />
        <SidebarItem
          icon={<FaTrophy />}
          label="Sold Bids"
          to="/admin/soldproduct"
        />
        <SidebarItem
          icon={<FaHeart />}
          label="My Favourite"
          to="/underconstruction"
        />
        <SidebarItem
          icon={<FaUser />}
          label="Personal Profile"
          to="/admin/editprofile"
        />
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-10 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        <FaSignOutAlt /> Log Out
      </button>
    </aside>
  );
};

export default AdminSidebar;
