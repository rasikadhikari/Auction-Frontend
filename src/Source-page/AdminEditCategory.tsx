import React, { useState, useEffect } from "react";
import axios from "../Service/axios";

const AdminCategoryPage = () => {
  interface Category {
    _id: string;
    title: string;
    user?: { name: string };
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/category");
      setCategories(res.data.category);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCategory = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "/category",
        { title },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSuccess(res.data.message);
      setTitle("");
      fetchCategories();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create category");
    }
  };

  const handleEditClick = (cat: any) => {
    setEditId(cat._id);
    setEditTitle(cat.title);
  };

  const handleEditSave = async (id: any) => {
    try {
      await axios.put(
        `/category/${id}`,
        { title: editTitle },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSuccess("Category updated successfully");
      setEditId(null);
      fetchCategories();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>

      <form onSubmit={handleCreateCategory} className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Category Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-64"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <div className="bg-white shadow rounded p-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">#</th>
              <th className="text-left py-2">Title</th>
              <th className="text-left py-2">Created By</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat._id} className="border-b">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">
                  {editId === cat._id ? (
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border p-1 rounded"
                    />
                  ) : (
                    cat.title
                  )}
                </td>
                <td className="py-2">{cat.user?.name || "N/A"}</td>
                <td className="py-2">
                  {editId === cat._id ? (
                    <button
                      onClick={() => handleEditSave(cat._id)}
                      className="text-green-600 hover:underline mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(cat)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategoryPage;
