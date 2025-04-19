import React from "react";
import {
  FaTrophy,
  FaHeart,
  FaUserCog,
  FaSignOutAlt,
  FaThLarge,
  FaUser,
  FaPlus,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SellerSidebar from "../components/SellerSidebar";

const SellerDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <SellerSidebar />
      {/* Main Content */}
      <main className="w-full md:w-3/4 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Activity</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon="💵"
            value="0"
            label="Balance"
            bg="bg-green-50"
            border="border-green-200"
          />
          <StatCard
            icon="🏅"
            value="0"
            label="Items Won"
            bg="bg-green-50"
            border="border-green-200"
          />
          <StatCard
            icon="🌟"
            value="0"
            label="Your Products"
            bg="bg-green-50"
            border="border-green-200"
          />
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false }: any) => (
  <div
    className={`flex items-center px-4 py-2 rounded cursor-pointer ${
      active
        ? "bg-green-100 text-green-800 font-medium"
        : "hover:bg-gray-100 text-gray-700"
    }`}
  >
    <span className="mr-3">{icon}</span>
    {label}
  </div>
);

const StatCard = ({ icon, value, label, bg, border }: any) => (
  <div
    className={`rounded-lg p-6 shadow-sm border ${bg} ${border} flex flex-col items-center justify-center`}
  >
    <div className="text-4xl mb-2">{icon}</div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-gray-600">{label}</p>
  </div>
);

export default SellerDashboard;
