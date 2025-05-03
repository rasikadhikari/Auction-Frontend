import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import axios from "../Service/axios";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [balance, setBalance] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [productCount, setProductCount] = useState<number>(0);
  const [itemsWon, setItemsWon] = useState<number>(0);
  const [myProduct, setMyProduct] = useState<number>(0);
  const [barChartData, setBarChartData] = useState<
    { name: string; users: number; products: number }[]
  >([]);
  const [pieChartData, setPieChartData] = useState<
    { name: string; value: number }[]
  >([]);

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

        setProductCount(products.length);

        const monthlyStats = Array(12)
          .fill(null)
          .map((_, i) => ({
            name: new Date(0, i).toLocaleString("default", { month: "short" }),
            users: 0,
            products: 0,
          }));

        users.forEach((user: any) => {
          const date = new Date(user.createdAt);
          const monthIndex = date.getMonth();
          monthlyStats[monthIndex].users += 1;
        });

        products.forEach((product: any) => {
          const date = new Date(product.createdAt);
          const monthIndex = date.getMonth();
          monthlyStats[monthIndex].products += 1;
        });

        setBarChartData(monthlyStats);

        let sold = 0;
        let unsold = 0;

        products.forEach((p: any) => {
          if (p.status === "sold") sold += 1;
          else unsold += 1;
        });

        setPieChartData([
          { name: "Sold", value: sold },
          { name: "Unsold", value: unsold },
        ]);

        toast.success("Dashboard data loaded successfully!");
      } catch (error) {
        console.error("Failed to fetch admin dashboard data", error);
        toast.error("Failed to load dashboard data.");
      }
    };

    fetchData();
    fetchMyproduct();
    fetchItemWon();
  }, []);

  const fetchItemWon = async () => {
    try {
      const res = await axios.get("bid/winning-bids", {
        withCredentials: true,
      });
      const wonItems = res.data?.winningBids || [];
      setItemsWon(wonItems.length);
    } catch (err) {
      console.error("Failed to fetch product won:", err);
      toast.error("Failed to fetch items won.");
    }
  };

  const fetchMyproduct = async () => {
    try {
      const res = await axios.get("/product/user");
      const Myproduct = res.data.products;
      setMyProduct(Myproduct.length);
    } catch (err) {
      console.error("Failed to load my product:", err);
      toast.error("Failed to fetch your products.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <ToastContainer />
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
          <StatCard
            icon="🏆"
            value={`${itemsWon}`}
            label="Items Won"
            color="green"
          />
          <StatCard
            icon="🛍️"
            value={`${myProduct}`}
            label="Your Products"
            color="green"
          />
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

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-8">
          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="text-lg font-semibold mb-4">
              Monthly Users vs Products
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" name="Users" />
                <Bar dataKey="products" fill="#82ca9d" name="Products" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="text-lg font-semibold mb-4">Product Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  <Cell fill="#8884d8" />
                  <Cell fill="#82ca9d" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
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
