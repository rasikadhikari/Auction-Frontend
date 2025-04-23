import React, { useState, useEffect } from "react";
import axios from "../Service/axios";
import { useParams } from "react-router-dom";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  isVerify: boolean;
  commission: number;
}

const VerifyProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Correct param name from URL

  const [product, setProduct] = useState<Product | null>(null);
  const [commission, setCommission] = useState<number | "">(0);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        setError("Product not found.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleCommissionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommission(Number(event.target.value));
  };

  const handleVerifyProduct = async () => {
    if (typeof commission !== "number" || commission <= 0) {
      setError("Commission must be a positive number.");
      return;
    }

    try {
      const response = await axios.patch(`/product/product-verify/${id}`, {
        commission,
      });
      setSuccessMessage(response.data.message);
      setError(null); // Clear previous errors if successful
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  if (!product) {
    return <div className="text-center text-lg">Loading product...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Verify Product and Add Commission
      </h1>
      <div className="space-y-4">
        <div className="text-lg">
          <h3 className="font-medium text-xl">
            Product Title: {product.title}
          </h3>
          <p>Description: {product.description}</p>
          <p>
            Price: <span className="font-bold">${product.price}</span>
          </p>
          <p>Status: {product.isVerify ? "Verified" : "Not Verified"}</p>
        </div>

        {product.isVerify ? (
          <div className="text-center text-xl text-gray-500">
            This product is already verified.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="commission" className="text-lg font-medium">
                Commission ($)
              </label>
              <input
                type="number"
                id="commission"
                value={commission}
                onChange={handleCommissionChange}
                min="0"
                className="mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="text-center">
              <button
                onClick={handleVerifyProduct}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
              >
                Verify and Add Commission
              </button>
            </div>
          </div>
        )}

        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
        {successMessage && (
          <div className="mt-4 text-green-500 text-center">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyProductPage;
