import React, { useEffect, useState } from "react";
import BuyerSidebar from "../components/BuyerSidebar";
import axios from "../Service/axios"; // assume you have an axios file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BuyerDashboard = () => {
  const [balancePending, setBalancePending] = useState<number>(0);
  const [itemsWon, setItemsWon] = useState<number>(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("bid/winning-bids", {
        withCredentials: true,
      });
      const wonItems = res.data?.winningBids || [];

      const pending = wonItems.reduce(
        (acc: number, item: any) => acc + (item.bidAmount || 0),
        0
      );

      setItemsWon(wonItems.length);
      setBalancePending(pending);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      toast.error("Failed to load dashboard data.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 py-10 shadow-md">
      <BuyerSidebar />

      {/* Main Content */}
      <main className="w-full md:w-3/4 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Activity</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon="💵"
            value={`$${balancePending}`}
            label="Balance pending"
            bg="bg-blue-50"
            border="border-blue-200"
          />
          <StatCard
            icon="🏅"
            value={`${itemsWon}`}
            label="Items Won"
            bg="bg-blue-50"
            border="border-blue-200"
          />
          <StatCard
            icon="❤️"
            value="0"
            label="Favorites"
            bg="bg-blue-50"
            border="border-blue-200"
          />
        </div>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
  bg: string;
  border: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  bg,
  border,
}) => (
  <div
    className={`rounded-lg p-6 shadow-sm border ${bg} ${border} flex flex-col items-center justify-center`}
  >
    <div className="text-4xl mb-2">{icon}</div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-gray-600">{label}</p>
  </div>
);

export default BuyerDashboard;
