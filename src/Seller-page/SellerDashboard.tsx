import React, { useEffect, useState } from "react";
import SellerSidebar from "../components/SellerSidebar";
import axios from "../Service/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellerDashboard = () => {
  const [balance, setBalance] = useState<number>(0);
  const [productCount, setProductCount] = useState<number>(0);

  const [soldCount, setSoldCount] = useState<number>(0);

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const res = await axios.get("/user", {
          withCredentials: true,
        });
        const seller = res.data.find((u: any) => u.role === "seller");
        setBalance(seller?.balance || 0);

        console.log(res.data); // Logged-in seller

        const productRes = await axios.get("/product/user", {
          withCredentials: true,
        });

        const sellerProducts = Array.isArray(productRes.data.products)
          ? productRes.data.products
          : [];
        const { data } = await axios.get("/bid/allbid");
        console.log("all sold bids---", data.soldBids);
        setSoldCount(data.soldBids.length);

        setProductCount(sellerProducts.length);

        toast.success("Dashboard data loaded successfully!");
      } catch (err) {
        console.error("Error fetching seller data:", err);
        toast.error("Failed to load dashboard data");
      }
    };

    fetchSellerData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <SellerSidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          Seller Activity
        </h1>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon="💰"
            value={`Rs ${balance ?? "Loading..."}`}
            label="Balance"
            color="green"
          />
          <StatCard
            icon="🏅"
            value={`${soldCount}`}
            label="Items Sold"
            color="blue"
          />
          <StatCard
            icon="🛍️"
            value={`${productCount}`}
            label="Your Products"
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
  value: string | number;
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

export default SellerDashboard;
