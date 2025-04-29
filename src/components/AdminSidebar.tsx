import React, { useEffect, useState } from "react";
import defaultPhoto from "../Images/Default.png";
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
import axios from "../Service/axios";

const AdminSidebar = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/user/login");
        return;
      }
      try {
        const res = await axios.get("user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);

        const { name, email, photo } = res.data;

        setName(name);
        setEmail(email);

        setProfilePic(`http://localhost:4000${photo}` || defaultPhoto);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        alert("Failed to load admin profile.");
        navigate("/user/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    navigate("/user/login");
  };

  return (
    <aside className="w-full md:w-1/4 bg-white p-6 shadow-md border-r rounded-2xl">
      {/* Admin Profile */}
      <div className="flex flex-col items-center mb-10">
        <img
          src={profilePic || defaultPhoto}
          alt="admin-profile"
          className="w-24 h-24 rounded-full mb-4"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultPhoto;
          }}
        />
        <h2 className="font-semibold text-lg">{name}</h2>
        <p className="text-sm text-gray-500">{email}</p>
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
          to="/underconstruction"
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
