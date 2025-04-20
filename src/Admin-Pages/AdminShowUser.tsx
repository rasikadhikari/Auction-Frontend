import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";

const AdminAllUsersPage = () => {
  // Dummy user data
  const users = [
    {
      id: 1,
      username: "Rasik",
      email: "rasik@gmail.com",
      role: "Buyer",
      photo: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
      date: "2025-04-19",
    },
    {
      id: 2,
      username: "AdminUser",
      email: "admin@admin.com",
      role: "Admin",
      photo: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
      date: "2025-04-18",
    },
    {
      id: 3,
      username: "SellerPro",
      email: "seller@market.com",
      role: "Seller",
      photo: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
      date: "2025-04-15",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 py-10">
      <AdminSidebar />

      <div className="w-full md:w-3/4 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">All Users</h1>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-green-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">S.N</th>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Photo</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    <img
                      src={user.photo}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  </td>
                  <td className="px-6 py-4">{user.date}</td>
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

export default AdminAllUsersPage;
