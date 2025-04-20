import React, { Fragment } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";

const AdminCategoryPage = () => {
  // Dummy category data for display
  const categories = [
    {
      id: 1,
      user: "Rasik",
      title: "Electronics",
      date: "2025-04-20",
    },
    {
      id: 2,
      user: "AdminUser",
      title: "Fashion",
      date: "2025-04-18",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 py-10">
      <AdminSidebar />

      <div className="w-full md:w-3/4 p-8">
        {/* Header with Create Category Button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Category List</h1>
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded shadow">
            + Create Category
          </button>
        </div>

        {/* Category Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-green-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">S.N</th>
                <th className="px-6 py-3">Users</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr key={cat.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{cat.user}</td>
                  <td className="px-6 py-4">{cat.title}</td>
                  <td className="px-6 py-4">{cat.date}</td>
                  <td className="px-6 py-4 flex gap-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
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

export default AdminCategoryPage;
