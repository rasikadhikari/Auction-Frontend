import { useEffect, useState } from "react";
import axios from "../Service/axios";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Dashboard = () => {
  interface Product {
    _id: string;
    title: string;
    price: number;
    image: string;
    category: { title: string };
    createdAt: string;
    isSoldout: boolean;
    bidCount?: number;
    isVerify?: boolean;
  }
  const [auctions, setAuctions] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<
    { _id: string; title: string }[]
  >([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [categoryRes, productRes] = await Promise.all([
          axios.get("/category"),
          axios.get("/product"),
        ]);

        if (categoryRes.data?.category) {
          setCategories(categoryRes.data.category);
        }
        console.log("product--------", productRes.data.product);

        if (productRes.data?.product) {
          const productsWithBids = await Promise.all(
            productRes.data.product.map(async (product: Product) => {
              try {
                const token = sessionStorage.getItem("token");
                const res = await axios.get(`bid/bid-count/${product._id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });

                return { ...product, bidCount: res.data.bidCount || 0 };
              } catch (err) {
                console.error(
                  `Failed to fetch bid count for ${product._id}`,
                  err
                );
                return { ...product, bidCount: 0 };
              }
            })
          );

          setAuctions(productsWithBids);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchAllData();
  }, []);
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
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, []);

  const navigate = useNavigate();

  const handlePlaceBid = (productId: string) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/user/login");
    } else {
      navigate(`/products/${productId}`);
    }
  };
  const filteredAuctions = selectedCategory
    ? auctions.filter((auction) => auction.category.title === selectedCategory)
    : auctions;

  const toggleWishlist = async (productId: string) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/user/login");
      return;
    }

    try {
      if (wishlist.includes(productId)) {
        await axios.delete(`/wishlist/remove/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(wishlist.filter((id) => id !== productId));
      } else {
        await axios.post(
          `/wishlist/add`,
          { productId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWishlist([...wishlist, productId]);
      }
    } catch (error) {
      console.error("Failed to update wishlist", error);
    }
  };

  return (
    <div className="bg-blue-600 text-white min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Create, Sell & Earn digital items.
          </h1>
          <p className="text-gray-300 mb-6">
            Nulla facilisi. Maecenas ac tellus ut ligula interdum convallis.
            Nullam dapibus on erat in dolor posuere, none hendrerit lectus
            ornare.
          </p>

          {/* Search bar */}
          <div className="flex bg-white rounded-full overflow-hidden shadow-lg max-w-xl">
            <input
              type="text"
              placeholder="Search product..."
              className="flex-grow px-4 py-2 text-gray-800 focus:outline-none"
            />
            <button className="bg-green-500 text-white px-6 font-semibold">
              Search
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 flex space-x-8 text-center">
            <div>
              <h2 className="text-2xl font-bold">{auctions.length}</h2>
              <p className="text-sm text-gray-300">Total Product</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{auctions.length}</h2>
              <p className="text-sm text-gray-300">Total Auction</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{categories.length}</h2>
              <p className="text-sm text-gray-300">Total Category</p>
            </div>
          </div>
        </div>

        {/* Right Content: Images + Cards */}
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg"
            alt="Main"
            className="rounded-3xl shadow-xl"
          />

          {/* Proof of Quality */}
          <div className="absolute top-0 left-0 bg-white text-gray-800 p-3 rounded-xl shadow-md text-sm">
            <p className="font-semibold">Proof of quality</p>
            <p className="text-gray-500">Lorem Ipsum Dolar Amet</p>
          </div>

          {/* Safe and Secure */}
          <div className="absolute bottom-0 right-0 bg-white text-gray-800 p-3 rounded-xl shadow-md text-sm">
            <p className="font-semibold">Safe and secure</p>
            <p className="text-gray-500">Lorem Ipsum Dolar Amet</p>
          </div>

          {/* Happy Client */}
          <div className="absolute bottom-[-3rem] left-0 bg-white text-gray-800 p-3 rounded-xl shadow-md text-sm w-fit">
            <p className="font-semibold">{auctions.length} Happy Client</p>
            <div className="flex mt-1 space-x-1">
              <span className="w-6 h-6 rounded-full bg-blue-500"></span>
              <span className="w-6 h-6 rounded-full bg-yellow-500"></span>
              <span className="w-6 h-6 rounded-full bg-pink-500"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Top Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
              {categories.map((category) => (
                <div
                  key={category._id}
                  onClick={() => setSelectedCategory(category.title)} // 🆕 Set selected category
                  className={`cursor-pointer bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-100 hover:shadow-md transition ${
                    selectedCategory === category.title ? "bg-green-100" : ""
                  }`}
                >
                  <div className="text-emerald-800 text-2xl mb-2">📦</div>
                  <p className="font-medium text-gray-700 text-sm">
                    {category.title?.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>

            {/* Auction Items */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {selectedCategory
                ? `${selectedCategory} Auctions`
                : "Live Auctions"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {filteredAuctions.length > 0 ? (
                filteredAuctions.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={`http://localhost:4000${item.image}`}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />

                      {/* 💖 Wishlist Icon - FIXED PLACEMENT */}
                      <div
                        className="absolute top-2 right-2 z-10 cursor-pointer"
                        onClick={() => toggleWishlist(item._id)}
                      >
                        {wishlist.includes(item._id) ? (
                          <FaHeart className="text-red-500 text-lg" />
                        ) : (
                          <FaRegHeart className="text-white text-lg" />
                        )}
                      </div>

                      {/* Bid Count */}
                      <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-3 py-1 rounded-full">
                        {item.bidCount} {item.bidCount === 1 ? "Bid" : "Bids"}
                      </div>

                      {/* Verification & Status */}
                      <div
                        className={`absolute bottom-2 right-2 text-white text-xs px-3 py-1 rounded-full ${
                          item.isSoldout ? "bg-red-500" : "bg-green-500"
                        }`}
                      >
                        {item.isSoldout ? "Sold Out" : "Available"}
                      </div>

                      {item.isVerify ? (
                        <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                          Verified
                        </div>
                      ) : (
                        <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                          Not Verified
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 text-sm mb-1">
                        {item.title}
                      </h3>
                      <div className="text-sm text-gray-600 mb-3">
                        <p>
                          <span className="font-medium">Current Bid:</span> $
                          {item.price}
                        </p>
                        <p>
                          <span className="font-medium">Buy Now:</span> $
                          {item.price + 100}
                        </p>
                      </div>

                      <button
                        disabled={item.isSoldout}
                        onClick={() => handlePlaceBid(item._id)}
                        className={`bg-blue-600 text-white text-sm px-4 py-2 rounded-lg w-full transition ${
                          item.isSoldout
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-blue-700"
                        }`}
                      >
                        {item.isSoldout ? "Sold Out" : "Place Bid"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center col-span-full">
                  No products found for this category.
                </p>
              )}
            </div>
            {/* How Does Auction Work Section */}
            <div className="bg-blue-600 py-16 px-6">
              <div className="max-w-7xl mx-auto text-white">
                <h2 className="text-3xl font-bold mb-10 text-center">
                  How Does Auction Work?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Create an Account",
                      description:
                        "Sign up for free and join the world of online auctions.",
                      image:
                        "https://cdn-icons-png.flaticon.com/512/1828/1828490.png",
                    },
                    {
                      title: "Browse Auctions",
                      description:
                        "Explore a variety of items listed by sellers worldwide.",
                      image:
                        "https://cdn-icons-png.flaticon.com/512/709/709496.png",
                    },
                    {
                      title: "Place a Bid",
                      description:
                        "Bid in real-time and get notified when you're outbid.",
                      image:
                        "https://cdn-icons-png.flaticon.com/512/3500/3500854.png",
                    },
                    {
                      title: "Win and Pay",
                      description:
                        "Win the auction and proceed to secure payment and delivery.",
                      image:
                        "https://cdn-icons-png.flaticon.com/512/833/833472.png",
                    },
                  ].map((step, index) => (
                    <div
                      key={index}
                      className="relative bg-white text-gray-800 rounded-2xl shadow-xl p-6 pt-16 text-center"
                    >
                      {/* Floating Image */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-16 h-16 rounded-full border-4 border-white shadow-md bg-white"
                        />
                      </div>

                      <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
