import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import axios from "../Service/axios";

const AdminDashboard = () => {
  const [balance, setBalance] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [productCount, setProductCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get("/user");
        const users = userRes.data;

        const admin = users.find((u: any) => u.role === "admin");
        setBalance(admin?.commissionBalance || 0);
        setUserCount(users.length);

        const productRes = await axios.get("/product");
        const products = productRes.data.product;
        console.log(products);
        setProductCount(products.length);
      } catch (error) {
        console.error("Failed to fetch admin dashboard data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          Admin Activity
        </h1>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon="💰"
            value={`Rs ${balance}`}
            label="Balance"
            color="green"
          />
          <StatCard icon="🏆" value="0" label="Items Won" color="green" />
          <StatCard icon="🛍️" value="0" label="Your Products" color="green" />
          <StatCard
            icon="📦"
            value={`${productCount}`}
            label="All Products"
            color="blue"
          />
          <StatCard
            icon="👥"
            value={`${userCount}`}
            label="All Users"
            color="yellow"
          />
        </div>
      </main>
    </div>
  );
};

const StatCard = ({
  icon,
  value,
  label,
  color,
}: {
  icon: string;
  value: string;
  label: string;
  color: string;
}) => {
  const bgColor = `bg-${color}-50`;
  const borderColor = `border-${color}-200`;

  return (
    <div
      className={`rounded-xl p-4 sm:p-6 shadow border ${bgColor} ${borderColor} flex flex-col items-center justify-center text-center`}
    >
      <div className="text-3xl sm:text-4xl mb-2">{icon}</div>
      <p className="text-xl sm:text-2xl font-bold">{value}</p>
      <p className="text-gray-600 text-sm sm:text-base">{label}</p>
    </div>
  );
};

export default AdminDashboard;
