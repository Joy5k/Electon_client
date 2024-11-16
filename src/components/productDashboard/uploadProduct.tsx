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

     <div className="flex bg-black w-full ">
    <div className="extraOutline p-4 w-max  m-auto rounded-lg">
        <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg" style={{width: "450px"}}>
            <svg className="text-indigo-500 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <div className="input_field flex flex-col w-max mx-auto text-center">
                <label>
                    <input className="text-sm cursor-pointer w-36 hidden" type="file" multiple />
                    <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Upload Image</div>
                </label>

                <div className="title text-indigo-500 uppercase">or drop files here</div>
            </div>
        </div>
    </div>
</div>


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
