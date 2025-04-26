import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

import AdminSidebar from "../components/AdminSidebar";
import axios from "../Service/axios";

const AdminSoldBidsPage = () => {
  interface SoldBid {
    productId: string;
    title: string;
    buyer?: { name: string };
    seller?: { name: string };
    soldPrice: number;
    soldDate: string;
    status: string;
  }

  const [soldBids, setSoldBids] = useState<SoldBid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSoldBids = async () => {
      try {
        const response = await axios.get("/bid/allbid");
        console.log(response.data.soldBids);
        setSoldBids(response.data.soldBids || []);
      } catch (err) {
        console.error("Error fetching sold bids:", err);
        setError("No sold bids found. Add product a see sold bid here.");
      } finally {
        setLoading(false);
      }
    };

    fetchSoldBids();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100 py-10">
      <AdminSidebar />

      <div className="w-full md:w-3/4 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Sold Bids</h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : soldBids.length === 0 ? (
          <p className="text-gray-600">No sold bids found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-green-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">S.N</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Winner</th>
                  <th className="px-6 py-3">Seller</th>
                  <th className="px-6 py-3">Price ($)</th>
                  <th className="px-6 py-3">Sold Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {soldBids.map((item, index) => (
                  <tr
                    key={item.productId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">{item.title}</td>
                    <td className="px-6 py-4">
                      {item.buyer?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4">
                      {item.seller?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4">${item.soldPrice}</td>
                    <td className="px-6 py-4">
                      {new Date(item.soldDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-green-600 flex items-center gap-2">
                      <FaCheckCircle /> {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSoldBidsPage;
