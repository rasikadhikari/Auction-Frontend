import React, { useEffect, useState } from "react";
import SellerSidebar from "../components/SellerSidebar";
import axios from "../Service/axios"; // assuming you're using the same axios instance
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellerCreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    height: "",
    lengthPic: "",
    width: "",
    mediumused: "",
    weight: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<
    { _id: string; title: string }[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/category");
        setCategories(res.data.category);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      submitData.append(key, value)
    );
    if (image) submitData.append("image", image);

    try {
      const res = await axios.post("/product", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
      toast.success(res.data.message || "Product created successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <SellerSidebar />
      <main className="flex-1 p-8 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 border-b pb-3">
            🎨 Seller Create Product
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="title"
                placeholder="Product Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="input border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.title}>
                    {cat.title}
                  </option>
                ))}
              </select>
              <input
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
                className="input border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                name="mediumused"
                placeholder="Medium Used"
                value={formData.mediumused}
                onChange={handleChange}
                className="input border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                name="height"
                placeholder="Height (cm)"
                value={formData.height}
                onChange={handleChange}
                className="input border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                name="lengthPic"
                placeholder="Length (cm)"
                value={formData.lengthPic}
                onChange={handleChange}
                className="input border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                name="width"
                placeholder="Width (cm)"
                value={formData.width}
                onChange={handleChange}
                className="input border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                name="weight"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={handleChange}
                className="input border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <textarea
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 resize-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="space-y-2">
              <label
                htmlFor="image"
                className="block text-gray-600 font-medium"
              >
                Upload Image
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="mt-3 w-40 h-40 object-cover rounded-md shadow"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition"
            >
              Submit Product
            </button>
          </form>
        </div>
      </main>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SellerCreateProduct;
