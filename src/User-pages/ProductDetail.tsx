import React, { useState } from "react";
import watch from "../Images/watch.jpg";

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState("description");

  const auctionHistory = [
    { name: "Alice", amount: "$1200" },
    { name: "Bob", amount: "$1100" },
    { name: "Charlie", amount: "$1000" },
  ];

  return (
    <div className="min-h-2 bg-blue-600 text-white px-6 py-12">
      <div className=" mx-auto grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div>
          <img
            src={watch}
            alt="Product"
            className="rounded-xl shadow-lg w-full"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4 bg-white rounded-2xl text-black p-6 ">
          <h2 className="text-3xl font-bold">Vintage Pocket Watch</h2>
          <p className="text-black">
            A beautifully preserved vintage pocket watch with mechanical
            movement. Rare and collectible.
          </p>
          <p className="text-black">Condition: Excellent</p>
          <p className="text-black">Time Left: 2d 4h 30m</p>
          <p className="text-black">Auction Ends: April 21, 2025</p>
          <p className="text-black font-semibold">Buy Now: $1,500.00</p>
          <p className="text-black font-semibold">Current Bid: $1,200.00</p>

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
            <div>
              <h3 className="font-semibold text-lg mb-2">Product Overview</h3>
              <ul className="space-y-1 text-sm">
                <li>Category: Watches</li>
                <li>Height: 5cm</li>
                <li>Length: 7cm</li>
                <li>Width: 3cm</li>
                <li>Weight: 200g</li>
              </ul>
            </div>
          )}

          {activeTab === "history" && (
            <div>
              <h3 className="font-semibold text-lg mb-4">Auction History</h3>
              <ul className="space-y-2">
                {auctionHistory.map((entry, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>{entry.name}</span>
                    <span className="font-semibold">{entry.amount}</span>
                  </li>
                ))}
              </ul>
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
