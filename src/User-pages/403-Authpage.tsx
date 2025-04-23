// src/pages/NotAuthorized.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Not Authorized
        </h2>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>
        <button
          onClick={handleGoBack}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition"
        >
          🔙 Return to Previous Page
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
