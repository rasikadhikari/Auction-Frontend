import React from "react";
import { useNavigate } from "react-router-dom";

const UnderConstruction: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // navigates to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-50 px-4 text-center">
      <div className="text-6xl mb-4">🚧</div>
      <h1 className="text-4xl font-bold text-yellow-700 mb-2">
        Page Under Construction
      </h1>
      <p className="text-lg text-yellow-600 mb-6">
        We're working hard to bring this page to life. Please check back soon!
      </p>
      <button
        onClick={goBack}
        className="px-5 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition"
      >
        ⬅️ Go Back
      </button>
    </div>
  );
};

export default UnderConstruction;
