import React from "react";
import {
  FaArchive,
  FaTrashAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";

const AdminAllProductsPage = () => {
  const products = [
    {
      id: 1,
      title: "iPhone 15 Pro",
      commission: 5,
      price: 1200,
      bidAmount: 1350,
      image: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
      verified: true,
    },
    {
      id: 2,
      title: "Gaming Laptop",
      commission: 8,
      price: 1500,
      bidAmount: 1800,
      image: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
      verified: false,
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 py-10">
      <AdminSidebar />

      <div className="w-full md:w-3/4 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">All Products</h1>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-green-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">S.N</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Commission (%)</th>
                <th className="px-6 py-3">Price ($)</th>
                <th className="px-6 py-3">Bid Amount ($)</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Verify</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium">{product.title}</td>
                  <td className="px-6 py-4">{product.commission}%</td>
                  <td className="px-6 py-4">${product.price}</td>
                  <td className="px-6 py-4">${product.bidAmount}</td>
                  <td className="px-6 py-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded border"
                    />
                  </td>
                  <td className="px-6 py-4">
                    {product.verified ? (
                      <FaCheckCircle className="text-green-600 text-lg" />
                    ) : (
                      <FaTimesCircle className="text-red-600 text-lg" />
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-4">
                    <button className="text-yellow-600 hover:text-yellow-800">
                      <FaArchive />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrashAlt />
                    </button>
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

export default AdminAllProductsPage;
