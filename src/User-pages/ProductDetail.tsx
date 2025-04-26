import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../Service/axios";

const ProductDetail = () => {
  const { id } = useParams();
  interface Product {
    title: string;
    price: number;
    image: string;
    height?: number;
    width?: number;
    weight?: number;
    mediumused?: string;
    description?: string;
    lengthPic?: number;
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [bidAmount, setBidAmount] = useState("");
  interface Bid {
    _id: string;
    price: number;
    user?: {
      name: string;
    };
  }

  const [auctionHistory, setAuctionHistory] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch product details and auction history
  useEffect(() => {
    fetchProduct();
    fetchAuctionHistory();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/product/${id}`, {
        withCredentials: true,
      });
      console.log(res.data.product);
      setProduct(res.data.product); // Change based on your backend response
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAuctionHistory = async () => {
    try {
      const res = await axios.get(`/bid/bidding-history/${id}`, {
        withCredentials: true,
      });
      const sortedBids = res.data.bidding.sort(
        (a: { price: number }, b: { price: number }) => b.price - a.price
      ); // Highest bid first
      setAuctionHistory(sortedBids);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBidSubmit = async () => {
    try {
      if (!bidAmount || isNaN(Number(bidAmount))) {
        alert("Please enter a valid bid amount");
        return;
      }
      setLoading(true);
      await axios.post(
        `/bid/bidding/${id}`,
        { price: Number(bidAmount), productId: id },
        { withCredentials: true }
      );
      setBidAmount("");
      fetchAuctionHistory(); // Refresh the history
      alert("Bid placed successfully!");
    } catch (err) {
      console.error(err);
      alert("Please enter the higher bid amount than the previous one");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Left side - Image */}
        <div className="md:w-1/2">
          <img
            src={`http://localhost:4000${product?.image}`}
            alt={product?.title || "Product Image"}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        {/* Right side - Product Overview */}
        <div className="md:w-1/2 flex flex-col justify-center">
          {product && (
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          )}
          <p className="text-lg text-gray-600 mb-2">
            Starting Price:{" "}
            <span className="font-semibold">Rs.{product?.price}</span>
          </p>
          {product?.mediumused && (
            <p className="text-gray-700 mb-2">
              Condition:{" "}
              <span className="font-medium">{product.mediumused}</span>
            </p>
          )}
          {product?.height && (
            <p className="text-gray-700 mb-2">
              Height: <span className="font-medium">{product.height}</span>
            </p>
          )}
          {product?.weight && (
            <p className="text-gray-700 mb-2">
              Weight: <span className="font-medium">{product.weight}</span>
            </p>
          )}
          {product?.width && (
            <p className="text-gray-700 mb-2">
              Width: <span className="font-medium">{product.width}</span>
            </p>
          )}
          {product?.lengthPic && (
            <p className="text-gray-700 mb-2">
              LengthPic:{" "}
              <span className="font-medium">{product.lengthPic}</span>
            </p>
          )}
          {product?.description && (
            <p className="text-gray-700 mb-2">
              Description:{" "}
              <span className="font-medium">{product.description}</span>
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Place Your Bid</h2>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Enter your bid"
            className="border p-2 rounded w-48"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
          <button
            onClick={handleBidSubmit}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          >
            {loading ? "Placing..." : "Place Bid"}
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Auction History</h2>
        <div className="border rounded p-4">
          {auctionHistory.length > 0 ? (
            auctionHistory.map((bid, index) => (
              <div
                key={bid._id}
                className="flex justify-between items-center py-2 border-b last:border-0"
              >
                <span className="font-medium">
                  {index === 0 ? "🏆 " : ""}
                  {bid.user?.name || "Anonymous"}
                </span>
                <span className="text-green-600 font-bold">Rs.{bid.price}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No bids yet. Be the first!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
