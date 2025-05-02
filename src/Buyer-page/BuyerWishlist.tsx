import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "../Service/axios";
import BuyerSidebar from "../components/BuyerSidebar";

interface WishlistItem {
  _id: string;
  product: {
    title: string;
    price: number;
    isSoldout: boolean;
    createdAt?: string;
  };
}

const BuyerWishlist = () => {
  const { auth } = useContext(AuthContext)!;
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (auth.user?.role === "buyer") {
        try {
          const response = await axios.get("/wishlist");
          setWishlist(response.data.wishlist);
          console.log("wishlist----", response.data.wishlist);
        } catch (error) {
          console.error("Error fetching buyer wishlist:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // stop loading if not buyer
      }
    };

    fetchWishlist();
  }, [auth]);

  return (
    <div className="min-h-screen flex bg-gray-100 py-10">
      <BuyerSidebar />

      <div className="w-full md:w-3/4 p-4 md:p-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          My Wishlist
        </h1>

        {loading ? (
          <p>Loading wishlist...</p>
        ) : wishlist.length === 0 ? (
          <p className="text-gray-600">No items in your wishlist.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">S.N</th>
                  <th className="px-6 py-3">Product Name</th>
                  <th className="px-6 py-3">Price ($)</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Added Date</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">
                      {item.product?.title || "N/A"}
                    </td>
                    <td className="px-6 py-4">${item.product?.price}</td>
                    <td className="px-6 py-4">
                      {item.product?.isSoldout ? (
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                          Sold Out
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                          Available
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {item.product?.createdAt
                        ? new Date(item.product.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerWishlist;
