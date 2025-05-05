import { useEffect, useState } from "react";
import axios from "../Service/axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaRegHeart, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState<any[]>([]);
  const [showBidHistory, setShowBidHistory] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/product/${id}`);
        setProduct(res.data.product);
        toast.success("Product loaded successfully!");
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favoriteIds = res.data.wishlist.map(
          (item: any) => item.productId
        );
        setWishlist(favoriteIds);
        toast.success("Wishlist loaded successfully!");
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Failed to load wishlist. Please try again.");
      }
    };

    fetchWishlist();
  }, []);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await axios.get(`/bid/${id}`);
        setBids(res.data.bids);
      } catch (error) {
        console.error("Error fetching bids:", error);
        toast.error("Failed to load bid history. Please try again.");
      }
    };

    fetchBids();
  }, [id]);

  const toggleWishlist = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/user/login");
      toast.info("Please login to manage your wishlist");
      return;
    }

    try {
      if (wishlist.includes(id!)) {
        await axios.delete(`/wishlist/remove/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(wishlist.filter((itemId) => itemId !== id));
        toast.success("Removed from wishlist!");
      } else {
        await axios.post(
          `/wishlist/add`,
          { productId: id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWishlist([...wishlist, id!]);
        toast.success("Added to wishlist!");
      }
    } catch (error) {
      console.error("Failed to update wishlist", error);
      toast.error("Failed to update wishlist. Please try again.");
    }
  };

  const handlePlaceBid = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/user/login");
      toast.info("Please login to place a bid");
      return;
    }

    try {
      await axios.post(
        `/bid/place/${id}`,
        { bidAmount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Bid placed successfully!");
      // Refresh bids
      const res = await axios.get(`/bid/${id}`);
      setBids(res.data.bids);
      setBidAmount("");
    } catch (error: any) {
      console.error("Failed to place bid:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to place bid. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="relative">
              <img
                src={`http://localhost:4000${product.image}`}
                alt={product.title}
                className="w-full h-96 object-contain rounded-lg"
              />
              <button
                onClick={toggleWishlist}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
              >
                {wishlist.includes(id!) ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-gray-600 text-xl" />
                )}
              </button>
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center mb-4">
                {product.isVerify ? (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Verified
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Not Verified
                  </span>
                )}
                <span className="ml-2 text-gray-500">
                  {product.category?.title}
                </span>
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Current Price: ${product.price}
                </h2>
                {product.isSoldout ? (
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded">
                    Sold Out
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
                    Available
                  </span>
                )}
              </div>

              {!product.isSoldout && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Place a Bid
                  </h3>
                  <div className="flex">
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder="Enter your bid amount"
                      className="border border-gray-300 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min={product.price + 1}
                    />
                    <button
                      onClick={handlePlaceBid}
                      className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition"
                    >
                      Bid
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Minimum bid: ${product.price + 1}
                  </p>
                </div>
              )}

              <button
                onClick={() => setShowBidHistory(!showBidHistory)}
                className="text-blue-600 hover:underline"
              >
                {showBidHistory ? "Hide" : "Show"} Bid History
              </button>

              {showBidHistory && bids.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Bid History
                  </h3>
                  <div className="max-h-60 overflow-y-auto">
                    {bids.map((bid, index) => (
                      <div
                        key={bid._id}
                        className="flex justify-between items-center py-2 border-b border-gray-200"
                      >
                        <div>
                          <p className="font-medium">
                            {index + 1}. {bid.buyer?.name || "Anonymous"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(bid.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <p className="font-bold">${bid.bidAmount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
