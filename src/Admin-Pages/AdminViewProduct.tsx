import React, { useEffect, useState } from "react";
import {
  FaArchive,
  FaTrashAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import axios from "../Service/axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  _id: string;
  title: string;
  commission: number;
  price: number;
  bidAmount: number;
  image: string;
  isVerify: boolean;
}

const AdminAllProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/product");
      console.log(res.data);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCommissionRedirect = (productId: string) => {
    console.log("Redirecting with ID:", productId);
    if (!productId) {
      console.error("Product ID is undefined!");
      return;
    }
    navigate(`/admin/commission/${productId}`);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      });
      setProducts(products.filter((product) => product._id !== productId));
      toast.success("Product deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 py-10">
      <AdminSidebar />

      <div className="w-full md:w-3/4 p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
          All Products
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-green-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-3 sm:px-6 py-3">S.N</th>
                  <th className="px-3 sm:px-6 py-3">Title</th>
                  <th className="px-3 sm:px-6 py-3">Commission (%)</th>
                  <th className="px-3 sm:px-6 py-3">Price ($)</th>
                  <th className="px-3 sm:px-6 py-3">Bid Amount ($)</th>
                  <th className="px-3 sm:px-6 py-3">Image</th>
                  <th className="px-3 sm:px-6 py-3">Verify</th>
                  <th className="px-3 sm:px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4">{index + 1}</td>
                    <td className="px-3 sm:px-6 py-4 font-medium">
                      {product.title}
                    </td>
                    <td className="px-3 sm:px-6 py-4">{product.commission}%</td>
                    <td className="px-3 sm:px-6 py-4">${product.price}</td>
                    <td className="px-3 sm:px-6 py-4">${product.bidAmount}</td>
                    <td className="px-3 sm:px-6 py-4">
                      <img
                        src={`http://localhost:4000${product.image}`}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded border"
                      />
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      {product.isVerify ? (
                        <FaCheckCircle className="text-green-600 text-lg" />
                      ) : (
                        <FaTimesCircle className="text-red-600 text-lg" />
                      )}
                    </td>
                    <td className="px-3 sm:px-6 py-4 flex gap-3 sm:gap-4">
                      <button
                        onClick={() => handleCommissionRedirect(product._id)}
                        className="text-yellow-600 hover:text-yellow-800"
                        title="Commission"
                      >
                        <FaArchive />
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-600 hover:text-red-800 text-sm sm:text-base"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminAllProductsPage;
