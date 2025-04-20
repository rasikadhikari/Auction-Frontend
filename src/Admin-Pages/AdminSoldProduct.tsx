import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
// You can conditionally render either sidebar based on role if needed

const AdminSoldBidsPage = () => {
  const soldBids = [
    {
      id: 1,
      title: "iPhone 15 Pro",
      winner: "john_doe",
      price: 1200,
      bidAmount: 1350,
      date: "2025-04-10",
      status: "Sold",
    },
    {
      id: 2,
      title: "Gaming Laptop",
      winner: "jane_smith",
      price: 1500,
      bidAmount: 1800,
      date: "2025-04-18",
      status: "Sold",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 py-10">
      {/* Change this to AdminSidebar if you're admin */}
      <AdminSidebar />

      <div className="w-full md:w-3/4 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Sold Bids</h1>

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
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium">{item.title}</td>
                  <td className="px-6 py-4">{item.winner}</td>
                  <td className="px-6 py-4">${item.price}</td>
                  <td className="px-6 py-4">${item.bidAmount}</td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4 text-green-600 flex items-center gap-2">
                    <FaCheckCircle /> {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSoldBidsPage;
