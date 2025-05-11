import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus, FaEyeSlash } from "react-icons/fa";
import SellerSidebar from "../components/SellerSidebar";
import axios from "../Service/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SellerDetail = () => {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  const fetchSellerProducts = async () => {
    try {
      const res = await axios.get("/product/user", {
        withCredentials: true,
      });
      setProducts(res.data.products || []);
      console.log(res.data.products);
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

  const handleDeleteProduct = async (productId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/product/${productId}`, {
        withCredentials: true,
      });
      console.log("Deleted product of id:", productId);
      toast.success("Product deleted successfully!");
      fetchSellerProducts();
    } catch (err: any) {
      console.error("Failed to delete product", err);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const handleArchiveProduct = async (productId: string) => {
    try {
      await axios.patch(
        `/product/${productId}/archive`,
        {},
        { withCredentials: true }
      );
      toast.success("Product archived/unarchived successfully!");
      fetchSellerProducts();
    } catch (err: any) {
      console.error("Failed to archive/unarchive product", err);
      toast.error("Failed to update archive status.");
    }
  };

  return (
    <div className="min-h-screen flex items-start bg-gray-100 py-10">
      <SellerSidebar />

      {/* Product Table (Right Side) */}
      <div className="w-full md:w-3/4 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Product Lists</h2>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={() => navigate("/createproduct")}
          >
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
                  <td className="px-6 py-4 flex space-x-3 items-center">
                    {product.isArchived === true ||
                    product.isArchived === "true" ? (
                      <FaEyeSlash
                        onClick={() => handleArchiveProduct(product._id)}
                        className="cursor-pointer text-gray-600"
                        title="Unarchive"
                      />
                    ) : (
                      <FaEye
                        onClick={() => handleArchiveProduct(product._id)}
                        className="cursor-pointer text-blue-600"
                        title="Archive"
                      />
                    )}
                    {product.isSoldout ? (
                      <FaEdit
                        className="text-gray-400 cursor-not-allowed"
                        title="Product is sold and cannot be edited"
                      />
                    ) : (
                      <FaEdit
                        className="cursor-pointer text-green-600"
                        title="Edit Product"
                        onClick={() =>
                          navigate("/editproduct", { state: { product } })
                        }
                      />
                    )}

                    <FaTrash
                      title="Delete"
                      onClick={() => handleDeleteProduct(product._id)}
                      className="cursor-pointer text-red-600"
                    />
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
