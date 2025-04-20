import React from "react";
import AdminSidebar from "../components/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <AdminSidebar />

      {/* Main Content */}
      <main className="w-full md:w-3/4 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Activity
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon="💰"
            value="0"
            label="Balance"
            bg="bg-green-50"
            border="border-green-200"
          />
          <StatCard
            icon="🏆"
            value="0"
            label="Items Won"
            bg="bg-green-50"
            border="border-green-200"
          />
          <StatCard
            icon="🛍️"
            value="0"
            label="Your Products"
            bg="bg-green-50"
            border="border-green-200"
          />
          <StatCard
            icon="📦"
            value="0"
            label="All Products"
            bg="bg-blue-50"
            border="border-blue-200"
          />
          <StatCard
            icon="👥"
            value="0"
            label="All Users"
            bg="bg-yellow-50"
            border="border-yellow-200"
          />
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ icon, value, label, bg, border }: any) => (
  <div
    className={`rounded-lg p-6 shadow-sm border ${bg} ${border} flex flex-col items-center justify-center`}
  >
    <div className="text-4xl mb-2">{icon}</div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-gray-600">{label}</p>
  </div>
);

export default AdminDashboard;
