import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar"; // assume you have an Admin Sidebar
import axios from "../Service/axios";

const AdminProductList = () => {
  const [adminProducts, setAdminProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all admin products
  const fetchAdminProducts = async () => {
    try {
      const res = await axios.get("/product/user", {
        withCredentials: true,
      });
      setAdminProducts(res.data.products || []);
    } catch (err) {
      console.error("Failed to fetch admin products", err);
    }
  };

  const handleSellProduct = async (productId: string) => {
    try {
      setLoading(true);
      await axios.post(
        "/bid/sell",
        { productId }, // Pass productId inside body
        { withCredentials: true }
      );
      await fetchAdminProducts(); // Refresh after selling
    } catch (err) {
      console.error("Failed to sell product", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminProducts();
  }, []);

  return (
    <div className="min-h-screen flex items-start bg-gray-100 py-10">
      <AdminSidebar />

      {/* Admin Product Table (Right Side) */}
      <div className="w-full md:w-3/4 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Admin Product Lists
          </h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">
            <FaPlus /> Create Admin Product
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg bg-white shadow-md">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">S.N</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Bid Amount</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Created By</th>
                <th className="px-6 py-3">Verify</th>
                <th className="px-6 py-3">Sold</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {adminProducts.map((product, index) => (
                <tr key={product._id} className="border-t">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{product.title}</td>
                  <td className="px-6 py-4">${product.price}</td>
                  <td className="px-6 py-4">{product.bidAmount || "N/A"}</td>
                  <td className="px-6 py-4">
                    <img
                      src={`http://localhost:4000${product.image}`}
                      alt={product.title}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">{product.createdBy || "Admin"}</td>
                  <td className="px-6 py-4 font-bold text-sm">
                    {product.isVerify ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-red-600">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {product.isSoldout ? (
                      <span className="text-gray-600 text-sm">Sold</span>
                    ) : (
                      <button
                        onClick={() => handleSellProduct(product._id)}
                        disabled={loading}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        {loading ? "Selling..." : "Sell"}
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 flex space-x-3">
                    <FaEye className="cursor-pointer text-blue-600" />
                    <FaEdit className="cursor-pointer text-green-600" />
                    <FaTrash className="cursor-pointer text-red-600" />
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

export default AdminProductList;
