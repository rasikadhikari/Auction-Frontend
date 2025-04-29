import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import axios from "../Service/axios";
import profile from "../Images/Default.png";

const AdminEditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Fetch admin profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/user/profile");
        console.log(res.data);

        const { name, email, role, photo } = res.data;

        setName(name);
        setEmail(email);
        setRole(role);
        setProfilePic(`http://localhost:4000${photo}`);
        console.log(photo);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        alert("Failed to load admin profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
      setProfilePic(imageUrl);
      setSelectedFile(file);
    }
    console.log(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (selectedFile) {
      formData.append("profilePic", selectedFile);
    }
    console.log(formData.get("profilePic"));

    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.put("/user/admin/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile updated successfully!");
      const updated = res.data.user;
      console.log(updated);
      setProfilePic(`http://localhost:4000${updated.photo}`);
    } catch (err) {
      console.error("Error updating profile", err);
      alert("Error updating profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <AdminSidebar />
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Edit Admin Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* Profile Picture */}
          <div className="flex items-center gap-6">
            <img
              src={profilePic}
              alt="Admin Profile"
              className="w-24 h-24 rounded-full object-cover border"
              onError={(e) => {
                (e.target as HTMLImageElement).src = profile;
              }}
            />
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-100 file:text-green-700
                  hover:file:bg-green-200
                "
              />
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full border rounded-md px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <input
              type="text"
              value={role}
              disabled
              className="w-full border rounded-md px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg shadow"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProfile;
