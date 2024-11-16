import React, { useState, FormEvent, useEffect } from "react";
import { IProduct } from "../../types";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ProductUploadForm = () => {
  const navigate = useNavigate();
  const [sellerId, setSellerId] = useState<string>("");
  const [product, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    image: "",
    price: 0,
    quantity: 0,
    color: [""],
    rating: undefined,
    sellerId, // Initially, sellerId is empty
  });
  const token = localStorage.getItem("token");

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const { userId } = jwtDecode(token) as { userId: string; email: string; role: string };
      setSellerId(userId); // Set the sellerId
    }
  }, [token, navigate]);

  useEffect(() => {
    if (sellerId) {
      setProduct((prev) => ({
        ...prev,
        sellerId, // Update the product's sellerId after it's set
      }));
    }
  }, [sellerId]); // Only update product when sellerId changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...product.color];
    newColors[index] = value;
    setProduct((prev) => ({ ...prev, color: newColors }));
  };

  const addColorField = () => setProduct((prev) => ({ ...prev, color: [...prev.color, ""] }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here, submit `product` data to your backend
    console.log("Product data:", product);
  };

  return (
    <form onSubmit={handleSubmit} className=" mx-auto p-6  border rounded-md shadow-md mb-10">
      <h2 className="text-2xl font-semibold mb-6 bg-transparent">Upload Product</h2>

     <div className="flex justify-start flex-wrap gap-4 ">
     <div className="mb-4 w-full min-w-40">
        <label className="block  mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block  mb-2">Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block  mb-2">Image URL</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block  mb-2">Price ($)</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block  mb-2">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block  mb-2">Colors</label>
        {product.color.map((color, index) => (
          <input
            key={index}
            type="text"
            value={color}
            onChange={(e) => handleColorChange(index, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
        <button
          type="button"
          onClick={addColorField}
          className="text-blue-500 mt-2 focus:outline-none"
        >
          + Add Color
        </button>
      </div>

      <div className="mb-4">
        <label className="block  mb-2">Rating (optional)</label>
        <input
          type="number"
          name="rating"
          value={product.rating ?? ""}
          onChange={handleInputChange}
          min={0}
          max={5}
          step={0.1}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
     </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Submit Product
      </button>
    </form>
  );
};

export default ProductUploadForm;
