// pages/BuyerEditProfile.jsx

import React, { useState } from "react";
import BuyerSidebar from "../components/BuyerSidebar";

const BuyerEditProfile = () => {
  const [name, setName] = useState("Test Buyer");
  const [email] = useState("buyer@gmail.com");
  const [role] = useState("Buyer");
  const [profilePic, setProfilePic] = useState(
    "https://i.ibb.co/ZYW3VTp/brown-brim.png"
  );

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // handle update logic here (e.g., API call)
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 py-10">
      <BuyerSidebar />
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-6">
            <img
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
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
                  file:bg-blue-100 file:text-blue-700
                  hover:file:bg-blue-200
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
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
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

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyerEditProfile;
