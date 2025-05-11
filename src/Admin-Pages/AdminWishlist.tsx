import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "../Service/axios";
import AdminSidebar from "../components/AdminSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface WishlistItem {
  _id: string;
  product: {
    _id: string;
    title: string;
    price: number;
    isSoldout: boolean;
    createdAt?: string;
  };
}

const AdminWishlist = () => {
  const { auth } = useContext(AuthContext)!;
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (auth.user?.role === "admin") {
        try {
          const response = await axios.get("/wishlist");
          setWishlist(response.data.wishlist);
          console.log("Admin wishlist:", response.data.wishlist);
          toast.success("Wishlist loaded successfully");
        } catch (error) {
          console.error("Error fetching admin wishlist:", error);
          toast.error("Failed to load wishlist");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        toast.error("You are not authorized to view the wishlist");
      }
    };

    fetchWishlist();
  }, [auth]);
  const handleRemoveFromWishlist = async (productId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to remove this item from the wishlist?"
      )
    )
      return;

    try {
      await axios.delete(`/wishlist/remove/${productId}`);
      setWishlist((prev) =>
        prev.filter((item) => item.product && item.product._id !== productId)
      );
      toast.success("Item removed from wishlist");
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 py-10">
      <AdminSidebar />

      <div className="w-full md:w-3/4 p-4 md:p-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          Admin Wishlist View
        </h1>

        {loading ? (
          <p>Loading wishlist...</p>
        ) : wishlist.length === 0 ? (
          <p className="text-gray-600">No items found in wishlist.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-purple-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">S.N</th>
                  <th className="px-6 py-3">Product Name</th>
                  <th className="px-6 py-3">Price ($)</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Added Date</th>
                  <th className="px-6 py-3">Action</th>
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
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          handleRemoveFromWishlist(item.product._id)
                        }
                        className="text-red-600 hover:text-red-800 text-sm"
                        title="Remove from Wishlist"
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminWishlist;
