import React from "react";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import SellerSidebar from "../components/SellerSidebar";

const SellerDetail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <SellerSidebar />

      {/* Product Table (Right Side) */}
      <div className="w-full md:w-3/4 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Product Lists</h2>
          <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2">
            <FaPlus /> Create Product
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg bg-white shadow-md">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">S.N</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Commission</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Bid Amount (USD)</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Verify</th>
                <th className="px-6 py-3">Sold</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">Test Product</td>
                <td className="px-6 py-4">0%</td>
                <td className="px-6 py-4">3223</td>
                <td className="px-6 py-4">3223</td>
                <td className="px-6 py-4">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="product"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 text-red-600 font-bold">No</td>
                <td className="px-6 py-4">
                  <button className="bg-gray-400 text-white px-3 py-1 rounded">
                    Sell
                  </button>
                </td>
                <td className="px-6 py-4 flex space-x-3">
                  <FaEye className="cursor-pointer text-blue-600" />
                  <FaEdit className="cursor-pointer text-green-600" />
                  <FaTrash className="cursor-pointer text-red-600" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode | string;
  label: string;
  active: boolean;
}

const MenuItem = ({ icon, label, active }: MenuItemProps) => (
  <div
    className={`flex items-center px-4 py-2 rounded ${
      active ? "bg-green-100 text-green-700" : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    <span className="mr-3">
      {typeof icon === "string" ? icon : <>{icon}</>}
    </span>
    {label}
  </div>
);

export default SellerDetail;
