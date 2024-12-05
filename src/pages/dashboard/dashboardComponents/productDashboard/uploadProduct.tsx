import React, { useState, FormEvent, useEffect } from "react";
import { ImgBBResponseData, IProduct } from "../../../../types";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateProductMutation } from "../../../../redux/features/admin/productManagementApi";
import Spinner from "../../../../components/Spinner/Spinner";
import axios from "axios";

const ProductUploadForm = () => {
     const [imageUploading,setImageUploadLoading]=useState<boolean>(false)
     const [imagePreview,setImagePreview]=useState<string>()
     const navigate = useNavigate();
     const [sellerId, setSellerId] = useState<string>("");
     const [product, setProduct] = useState<IProduct>({

    title: "",
    description: "",
    category:"",
    image: "",
    price: 0,
    quantity: 0,
    color: [""],
    rating: undefined,
    sellerId, 
  });
  const [createProduct]=useCreateProductMutation()
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    setProduct((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    }));
  };
  

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...product.color];
    newColors[index] = value;
    setProduct((prev) => ({ ...prev, color: newColors }));
  };

  const addColorField = () => setProduct((prev) => ({ ...prev, color: [...prev.color, ""] }));

  const handleSaveImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (!file) {
      console.error("No file provided");
      return;
    }
  
    setImageUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
  
      const response = await axios.post<ImgBBResponseData>(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_KEY}`,
        formData
      );
  
      if (response.data && response.data.data && response.data.data.url) {
        const uploadedImageUrl = response.data.data.url;
        setImagePreview(uploadedImageUrl);
        toast.success("Image Uploaded successfully");
        setProduct((prev) => ({
          ...prev,
          image: uploadedImageUrl, // Update the image field in the product state
        }));
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageUploadLoading(false);
    }
  };
  
  


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      // Create product using the product state
      const res = await createProduct(product).unwrap();
      // Check if the product was created successfully
      if (res?.success) {
        // Success: Show success toast
        toast.success("Created product successfully");
  
        // Reset form fields to initial state (clear the form)
        setProduct({
          _id:"",
          title: "",
          description: "",
          category:"",
          color: [""],
          price: 0,
          quantity: 0,
          image: "",
          sellerId: "", // Or the value that corresponds to the current seller
        });
        setImagePreview("")
      }
    } catch (error) {
      // Error: Show error toast
      toast.error("Something went wrong");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className=" mx-auto p-6  border rounded-md shadow-md mb-10">
      <h2 className="text-2xl font-semibold mb-6 bg-transparent">Upload Product</h2>

     <div className="flex justify-start flex-wrap gap-4 ">
     <div className="flex bg-black w-full">
  {imageUploading ? (
    <Spinner />
  ) : (
    <div className="extraOutline p-4 w-max m-auto rounded-lg">
      {imagePreview ? (
        <div className="text-center">
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            className="rounded-lg w-full h-44 mb-4"
          />
          <button
            onClick={() => setImagePreview("")}
            className="text-white bg-primary  rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500"
          >
           Cancel
          </button>
        </div>
      ) : (
        <div
          className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
          style={{ width: "450px" }}
        >
          <svg
            className="text-indigo-500 w-24 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div className="input_field flex flex-col w-max mx-auto text-center">
            <label>
              <input
                onChange={(e) => handleSaveImage(e)}
                className="text-sm cursor-pointer w-36 hidden"
                type="file"
                multiple
              />
              <div className="text bg-primary text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                Upload Image
              </div>
            </label>
            <div className="title text-primary uppercase">
              or drop files here
            </div>
          </div>
        </div>
      )}
    </div>
  )}
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

      <div className="mb-4 w-full min-w-40">
      <label className="block mb-2">Description</label>
      <textarea
        name="description"
        value={product.description}
        maxLength={500}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      ></textarea>
      <p className="text-sm text-gray-500 mt-1">
        {product.description.length} / 500 characters
      </p>
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
        <label className="block mb-2 font-medium">Category</label>
        <select
          name="category"
          value={product.category}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="pc">PC</option>
          <option value="laptop">Laptop</option>
          <option value="box">Box</option>
          <option value="earphone">Earphone</option>
          <option value="camera">Camera</option>
          <option  selected value="others">Others</option>
        </select>
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
        className="w-full p-2 bg-primary text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Submit Product
      </button>
    </form>
  );
};

export default ProductUploadForm;
