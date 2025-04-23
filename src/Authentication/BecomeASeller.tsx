import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../Service/axios";

const BecomeSeller = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleBecomeSeller = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/user/register", {
        name,
        email,
        password,
        role: "seller", // 🔥 Important
      });

      alert("Seller account created successfully!");
      console.log(response.data);
    } catch (err: any) {
      console.error("Error during seller registration:", err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-2">
          Become a Seller
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Start selling and reach more customers today.
        </p>

        <form onSubmit={handleBecomeSeller} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md text-lg font-medium hover:bg-green-700 transition"
          >
            Become a Seller
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/user/login"
            className="text-green-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BecomeSeller;
