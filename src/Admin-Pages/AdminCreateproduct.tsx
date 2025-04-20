import React, { useState } from "react";

import axios from "axios";

import AdminSidebar from "../components/AdminSidebar";

const AdminCreateProduct = () => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    if (image) submitData.append("file", image);

    try {
      const res = await axios.post("/api/product/create", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to create product.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <AdminSidebar />
      {/* Create Form */}
      <main className="w-full md:w-3/4 p-10 ">
        <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-lg shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input-style border-1 rounded-md"
            />
            <input
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="input-style border-1 rounded-md "
            />

            <input
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="input-style border-1 rounded-md"
            />
            <input
              name="height"
              placeholder="Height"
              value={formData.height}
              onChange={handleChange}
              className="input-style border-1 rounded-md"
            />
            <input
              name="lengthPic"
              placeholder="Length"
              value={formData.lengthPic}
              onChange={handleChange}
              className="input-style border-1 rounded-md"
            />
            <input
              name="width"
              placeholder="Width"
              value={formData.width}
              onChange={handleChange}
              className="input-style border-1 rounded-md"
            />
            <input
              name="weight"
              placeholder="Weight"
              value={formData.weight}
              onChange={handleChange}
              className="input-style border-1 rounded-md"
            />
            <input
              name="mediumused"
              placeholder="Medium Used"
              value={formData.mediumused}
              onChange={handleChange}
              className="input-style border-1 rounded-md"
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border-2 px-4 py-2 rounded h-32"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border-1 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
          >
            Submit Product
          </button>
        </form>
      </main>
    </div>
  );
};

export default AdminCreateProduct;
