import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import axios from "../Service/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AdminProductList = () => {
  const [adminProducts, setAdminProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const fetchAdminProducts = async () => {
    try {
      const res = await axios.get("/product/user", {
        withCredentials: true,
      });
      setAdminProducts(res.data.products || []);
    } catch (err) {
      console.error("Failed to fetch admin products", err);
      toast.error("Failed to load admin products");
    }
  };

  const handleSellProduct = async (productId: string) => {
    try {
      setLoading(true);
      await axios.post("/bid/sell", { productId }, { withCredentials: true });
      await fetchAdminProducts();
      toast.success("Product sold successfully!");
    } catch (err) {
      console.error("Failed to sell product", err);
      toast.error("Failed to sell product");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axios.delete(`/product/${productId}`, {
        withCredentials: true,
      });
      await fetchAdminProducts();
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error("Failed to delete product", err);
      toast.error("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const handleArchiveProduct = async (productId: string) => {
    try {
      setLoading(true);
      await axios.patch(
        `/product/${productId}/archive`,
        {},
        { withCredentials: true }
      );
      await fetchAdminProducts();
      toast.success("Product archive status updated!");
    } catch (err) {
      console.error("Failed to archive/unarchive product", err);
      toast.error("Failed to update archive status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminProducts();
  }, []);

  const visibleProducts = adminProducts.filter((product) => {
    const isArchived =
      product.isArchived === true || product.isArchived === "true";
    return showArchived ? true : !isArchived;
  });
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-start bg-gray-100 py-10">
      <AdminSidebar />

      <div className="w-full md:w-3/4 p-8">
        <ToastContainer />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Admin Product Lists
          </h2>
          <div className="flex gap-4">
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={() => setShowArchived(!showArchived)}
            >
              {showArchived ? "Hide Archived" : "Show Archived"}
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">
              <FaPlus /> Create Admin Product
            </button>
          </div>
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
                <th className="px-6 py-3">Verify</th>
                <th className="px-6 py-3">Sold</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleProducts.map((product, index) => (
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
                          navigate("/admin/admineditproduct", {
                            state: { product },
                          })
                        }
                      />
                    )}

                    <FaTrash
                      onClick={() => handleDeleteProduct(product._id)}
                      className="cursor-pointer text-red-600"
                    />
                  </td>
                </tr>
              ))}
              {visibleProducts.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProductList;
