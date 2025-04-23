import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  interface Product {
    title: string;
    description: string;
    mediumused: string;
    price: number;
    soldPrice: number;
    image: string;
    category: string;
    height: number;
    lengthPic: number;
    width: number;
    weight: number;
    isVerify: boolean;
    createdAt: string;
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/product/${id}`);
        setProduct(res.data.product);
        console.log(res.data.product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-blue-600 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div>
          <img
            src={`http://localhost:4000${product.image}`}
            alt={product.title}
            className="rounded-xl shadow-lg w-full"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4 bg-white rounded-2xl text-black p-6">
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <p>{product.description}</p>
          <p>Condition: {product.mediumused}</p>
          <p>Time Left: 2d 4h 30m</p> {/* Optional: calculate real time */}
          <p>Auction Ends: April 21, 2025</p> {/* Optional: use real date */}
          <p className="font-semibold">Buy Now: ${product.price}</p>
          <p className="font-semibold">Sold Price: ${product.soldPrice}</p>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              placeholder="Enter your bid"
              className="px-4 py-2 border-2 rounded text-gray-800 w-full max-w-sm"
            />
            <button className="bg-green-500 px-6 py-2 font-semibold rounded">
              Place Bid
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16 max-w-7xl mx-auto">
        <div className="flex space-x-6 border-b border-gray-300 text-white">
          {["description", "history", "review"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 border-b-2 ${
                activeTab === tab
                  ? "border-white font-bold"
                  : "border-transparent"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "description"
                ? "Description"
                : tab === "history"
                  ? "Auction History"
                  : "Review"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6 bg-white rounded-xl p-6 text-gray-800 shadow-md">
          {activeTab === "description" && (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              {/* Left: Product Specs */}
              <div className="space-y-2 text-sm md:text-base">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">
                  Product Overview
                </h3>
                <ul className="space-y-2">
                  <li>
                    <span className="font-medium">Category:</span>{" "}
                    {product.category}
                  </li>
                  <li>
                    <span className="font-medium">Height:</span>{" "}
                    {product.height} cm
                  </li>
                  <li>
                    <span className="font-medium">Length:</span>{" "}
                    {product.lengthPic} cm
                  </li>
                  <li>
                    <span className="font-medium">Width:</span> {product.width}{" "}
                    cm
                  </li>
                  <li>
                    <span className="font-medium">Weight:</span>{" "}
                    {product.weight} g
                  </li>
                  <li>
                    <span className="font-medium">Verified:</span>{" "}
                    {product.isVerify} g
                  </li>
                  <li>
                    <span className="font-medium">Created:</span>{" "}
                    {product.createdAt} g
                  </li>
                  <li>
                    <span className="font-medium">Updated:</span>{" "}
                    {product.createdAt} g
                  </li>
                </ul>
              </div>

              {/* Right: Thumbnail image */}
              <div className="mt-6 md:mt-0 md:ml-8">
                <img
                  src={`http://localhost:4000${product.image}`}
                  alt={product.title}
                  className="w-32 h-32 object-cover rounded-md border border-gray-300 shadow"
                />
              </div>
            </div>
          )}
          {activeTab === "history" && (
            <div>
              <h3 className="font-semibold text-lg mb-4">Auction History</h3>
              <p className="text-sm text-gray-500">
                No history implemented yet.
              </p>
            </div>
          )}

          {activeTab === "review" && (
            <div>
              <p className="text-sm text-gray-600">No reviews yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
