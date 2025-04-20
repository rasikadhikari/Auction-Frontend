import React from "react";
import BuyerSidebar from "../components/BuyerSidebar";

const BuyerWinningProducts = () => {
  // Sample data (replace with real data from backend)
  const winningItems = [
    {
      id: 1,
      title: "Vintage Camera",
      commission: 10,
      price: 200,
      bidAmount: 220,
      image: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
      status: "Delivered",
    },
    {
      id: 2,
      title: "Leather Jacket",
      commission: 5,
      price: 150,
      bidAmount: 165,
      image: "https://i.ibb.co/0jqHpnp/sneakers.png",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 py-10">
      <BuyerSidebar />

      <div className="w-full md:w-3/4 p-6">
        <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Winning Products
          </h1>
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">S.N</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Commission (%)</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Bid Amount</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {winningItems.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 font-medium">{item.title}</td>
                  <td className="px-4 py-2">{item.commission}%</td>
                  <td className="px-4 py-2">${item.price}</td>
                  <td className="px-4 py-2">${item.bidAmount}</td>
                  <td className="px-4 py-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {winningItems.length === 0 && (
            <p className="text-center text-gray-500 py-4">No items won yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerWinningProducts;
