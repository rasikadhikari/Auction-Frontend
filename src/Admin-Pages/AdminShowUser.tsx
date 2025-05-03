import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import axios from "../Service/axios";
import profile from "../Images/Default.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
  createdAt: string;
}

const AdminAllUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/user");
      console.log(res.data);
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/user/${userId}`);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
      toast.success("User deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 py-10">
      <AdminSidebar />

      <div className="w-full md:w-3/4 p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          All Users
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading users...</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-green-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-3 sm:px-6 py-3">S.N</th>
                  <th className="px-3 sm:px-6 py-3">Username</th>
                  <th className="px-3 sm:px-6 py-3">Email</th>
                  <th className="px-3 sm:px-6 py-3">Role</th>
                  <th className="px-3 sm:px-6 py-3">Photo</th>
                  <th className="px-3 sm:px-6 py-3">Date</th>
                  <th className="px-3 sm:px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4">{index + 1}</td>
                    <td className="px-3 sm:px-6 py-4 font-medium">
                      {user.name}
                    </td>
                    <td className="px-3 sm:px-6 py-4">{user.email}</td>
                    <td className="px-3 sm:px-6 py-4">{user.role}</td>
                    <td className="px-3 sm:px-6 py-4">
                      <img
                        src={`http://localhost:4000${user.photo}` || profile}
                        alt={user.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border"
                      />
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 sm:px-6 py-4 flex gap-3 sm:gap-4">
                      <button
                        onClick={() => handleDelete(user._id)}
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

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminAllUsersPage;
