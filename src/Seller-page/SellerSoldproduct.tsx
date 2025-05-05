import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import SellerSidebar from "../components/SellerSidebar"; // Or AdminSidebar
import axios from "../Service/axios";
import { toast } from "react-toastify";

const SoldBidsPage = () => {
  interface SoldBid {
    _id: string;
    title: string;
    buyer?: { name: string };
    price: number;
    soldPrice: number;
    soldDate: string;
  }

  const [soldBids, setSoldBids] = useState<SoldBid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoldBids = async () => {
      try {
        const { data } = await axios.get("/bid/allbid");
        console.log(data.soldBids);
        setSoldBids(data.soldBids);
        toast.success("Sold bids loaded successfully!");
      } catch (error) {
        console.error("Error fetching sold bids:", error);
        toast.error("Failed to load sold bids. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSoldBids();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100 py-10">
      <SellerSidebar />

      <div className="w-full md:w-3/4 p-4 md:p-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          Sold Bids
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : soldBids.length === 0 ? (
          <p className="text-gray-600">No sold bids available.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-green-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">S.N</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Winner</th>
                  <th className="px-6 py-3">Price ($)</th>
                  <th className="px-6 py-3">Bid Amount ($)</th>
                  <th className="px-6 py-3">Sold Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {soldBids.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">{item.title}</td>
                    <td className="px-6 py-4">{item.buyer?.name || "N/A"}</td>

                    <td className="px-6 py-4">${item.price}</td>
                    <td className="px-6 py-4">${item.soldPrice}</td>
                    <td className="px-6 py-4">
                      {new Date(item.soldDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-green-600 flex items-center gap-2">
                      <FaCheckCircle /> Sold
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

export default SoldBidsPage;
