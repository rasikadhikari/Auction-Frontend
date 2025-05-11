import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../Service/axios";
import { toast } from "react-toastify";
import AdminSidebar from "../components/AdminSidebar";

const AdminEditProduct = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  if (!product) {
    toast.error("Product data not found");
    navigate("/admin/adminproduct");
    return null;
  }

  const [existingImage, setExistingImage] = useState(
    product.image ? `http://localhost:4000${product.image}` : ""
  );

  const [formData, setFormData] = useState({
    title: product.title || "",
    description: product.description || "",
    price: product.price || "",
    category: product.category?.title || "",
    height: product.height || "",
    lengthPic: product.lengthPic || "",
    width: product.width || "",
    mediumused: product.mediumused || "",
    weight: product.weight || "",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
      setExistingImage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!product.user?._id) {
        toast.error("User information is missing");
        return;
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("height", formData.height);
      data.append("lengthPic", formData.lengthPic);
      data.append("width", formData.width);
      data.append("mediumused", formData.mediumused);
      data.append("weight", formData.weight);
      data.append("user", product.user._id);
      if (formData.image) {
        data.append("image", formData.image);
      }

      await axios.put(`/product/${product._id}`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product updated successfully!");
      navigate("/admin/adminproduct");
    } catch (error: any) {
      console.error("Update failed:", error);
      toast.error(error.response?.data?.message || "Failed to update product");
    }
  };

  return (
    <div className="min-h-screen flex items-start bg-gray-100 py-10">
      <AdminSidebar />
      <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="input-style border-1 rounded-xl h-12 flex p-3 w-full"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="input-style text-gray-500 border-1 rounded-xl h-12 flex p-3 w-full"
                disabled
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="input-style border-1 rounded-xl h-12 flex p-3 w-full"
              />
            </div>
          </div>

          <div>
            <label className="font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring zmen-2 focus:ring-blue-400 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="font-medium text-gray-700">Height</label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Height"
                className="input-style border-1 rounded-xl h-10 flex p-3 w-full"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Length</label>
              <input
                type="text"
                name="lengthPic"
                value={formData.lengthPic}
                onChange={handleChange}
                placeholder="Length"
                className="input-style border-1 rounded-xl h-10 flex p-3 w-full"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Width</label>
              <input
                type="text"
                name="width"
                value={formData.width}
                onChange={handleChange}
                placeholder="Width"
                className="input-style border-1 rounded-xl h-10 flex p-3 w-full"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Medium Used</label>
              <input
                type="text"
                name="mediumused"
                value={formData.mediumused}
                onChange={handleChange}
                placeholder="Medium Used"
                className="input-style border-1 rounded-xl h-10 flex p-3 w-full"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Weight</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight"
                className="input-style border-1 rounded-xl h-10 flex p-3 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600 border h-10 p-3 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="New Preview"
                className="mt-4 w-48 h-48 object-cover rounded-lg border"
              />
            ) : existingImage ? (
              <img
                src={existingImage}
                alt="Existing Product"
                className="mt-4 w-48 h-48 object-cover rounded-lg border"
              />
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProduct;
