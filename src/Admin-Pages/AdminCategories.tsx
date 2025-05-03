import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import axios from "../Service/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS

interface Category {
  _id: string;
  title: string;
  createdAt: string;
  user: {
    name: string;
  };
}

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/category");
      setCategories(res.data.category || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/category/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Category deleted successfully");
      fetchCategories(); // refresh the list
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete the category"
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 py-10">
      <AdminSidebar />
      <ToastContainer /> {/* 🔔 Toast container */}
      <div className="w-full md:w-3/4 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Category List</h1>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded shadow"
            onClick={() => navigate("/admin/createcategory")}
          >
            + Create Category
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading categories...</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-green-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">S.N</th>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr key={cat._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{cat.user?.name || "N/A"}</td>
                    <td className="px-6 py-4">{cat.title}</td>
                    <td className="px-6 py-4">
                      {new Date(cat.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 flex gap-4">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() =>
                          navigate(`/admin/editcategory/${cat._id}`)
                        }
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(cat._id)}
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
    </div>
  );
};

export default AdminCategoryPage;
