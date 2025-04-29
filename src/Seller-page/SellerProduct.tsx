import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import SellerSidebar from "../components/SellerSidebar";
import axios from "../Service/axios";
import { toast } from "react-toastify"; // Import Toastify (Optional but good UX)

const SellerDetail = () => {
  const [products, setProducts] = useState<any[]>([]);

  const fetchSellerProducts = async () => {
    try {
      const res = await axios.get("/product/user", {
        withCredentials: true,
      });
      setProducts(res.data.products || []);
      console.log(res.data);
    } catch (err) {
      console.error("Failed to fetch seller products", err);
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  const handleSellProduct = async (productId: string) => {
    try {
      const res = await axios.post(
        "/bid/sell",
        { productId },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message || "Product sold successfully!");
      fetchSellerProducts(); // Refresh product list
    } catch (error: any) {
      console.error("Failed to sell product", error);
      toast.error(
        error.response?.data?.message || "Failed to sell product. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-start bg-gray-100 py-10">
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
              {products.map((product, index) => (
                <tr key={product._id} className="border-t">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{product.title}</td>
                  <td className="px-6 py-4">{product.commission || "0%"}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.bidAmount || "N/A"}</td>
                  <td className="px-6 py-4">
                    <img
                      src={`http://localhost:4000${product.image}`}
                      alt={product.title}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
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
                    ) : product.bidAmount ? (
                      <button
                        onClick={() => handleSellProduct(product._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Sell
                      </button>
                    ) : (
                      <span className="text-gray-500 text-sm">No Bids</span>
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

export default SellerDetail;
