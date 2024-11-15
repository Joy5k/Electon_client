import React, { useState, FormEvent } from "react";

interface IProduct {
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  color: string[];
  rating?: number;
  sellerId:string;
}

const ProductUploadForm: React.FC = () => {
  const [product, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    image: "",
    price: 0,
    quantity: 0,
    color: [""],
    rating: undefined,
    sellerId: new Types.ObjectId(), // Placeholder ID
  });

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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload Product</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
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
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Image URL</label>
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
        <label className="block text-gray-700 mb-2">Price ($)</label>
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
        <label className="block text-gray-700 mb-2">Quantity</label>
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
        <label className="block text-gray-700 mb-2">Colors</label>
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
        <label className="block text-gray-700 mb-2">Rating (optional)</label>
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
