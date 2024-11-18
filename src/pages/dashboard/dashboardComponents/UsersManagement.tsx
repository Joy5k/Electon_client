import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import axios from "axios";
import { useDeleteProductMutation, useUpdateProductMutation } from "../../../redux/features/admin/productManagementApi";
import { ImgBBResponseData, IProduct, IUser } from "../../../types";
import { useGetAllUsersQuery } from "../../../redux/features/admin/userManagementApi";
import Spinner from "../../../components/Spinner/Spinner";


function UsersManagement() {
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct]=useUpdateProductMutation()
  const {data}=useGetAllUsersQuery({})
  const [imageUploading,setImageUploadLoading]=useState<boolean>(false)
     const [imagePreview,setImagePreview]=useState<string>()
     const [selectedUser, setSelectedUser] = useState<any>(null);
    const [product,setUser]=useState<IProduct>()

      useEffect(() => {
        if (selectedUser) {
          setUser({
            title: selectedUser.title || "",
            description: selectedUser.description || "",
            image: selectedUser.image || "",
            price: selectedUser.price || 0,
            quantity: selectedUser.quantity || 0,
            color: selectedUser.color || [],
            rating: selectedUser.rating,
            sellerId: selectedUser.sellerId._id || "",
          });
        }
      }, [selectedUser]);
  

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
console.log(data.data)
  // Calculate pagination variables
  const totalPages = Math.ceil(data.data.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.data.slice(indexOfFirstRow, indexOfLastRow);

  
    // Only update product when sellerId changes
  // Deleting product

  const handleDeleteProduct = async (id: string) => {
    const res = await deleteProduct(id).unwrap();

    if (res?.success) {
      toast.success("Product deleted successfully");
    }
  };

// handle all input element for getting value to update product
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  setUser((prev) => ({
    ...prev,
    [name]: (name === "quantity" || name === "price") ? Number(value) : value,
  }) as IProduct); // Explicit cast ensures TypeScript recognizes the result matches IProduct.
};


  // Opening the modal
  const handleUpdateClick = (user: any) => {
    console.log(user)
    setImagePreview(user?.image)
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // handle the image uploading system
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
        setUser((prev) => ({
          ...prev,
          image: uploadedImageUrl, // Update the image field in the product state
        }) as IProduct);
        console.log(uploadedImageUrl)
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageUploadLoading(false);
    }
  };

  // update product function
  const handleUpdateProduct=async()=>{
    const payload={
      data:product,
      id:selectedUser._id
    }
    console.log(payload)
   try {
    const res=await updateProduct(payload).unwrap();
    console.log(res)
    if(res.success){
      toast.success("Product update successfully")
      setIsModalOpen(false);
      setSelectedUser(null);
    }
   } catch (error) {
    toast.error("Something went wrong")
   }
  }



  return (
    <div className="overflow-x-auto mr-5">
      <table className="w-full bg-white border-collapse overflow-scroll">
        <thead>
          <tr className="border bg-gray-100">
            <th className="px-4 py-2 whitespace-nowrap">No.</th>
            <th className="px-4 py-2 whitespace-nowrap">Image</th>
            <th className="px-4 py-2 whitespace-nowrap">Name</th>
            <th className="whitespace-nowrap">Role</th>
            <th className="px-4 py-2 whitespace-nowrap">Email</th>
            <th className="px-4 py-2 whitespace-nowrap">Status</th>
            <th className="whitespace-nowrap">Delete</th>
            <th className="px-4 py-2 whitespace-nowrap">Change Role</th>
          </tr>
        </thead>
        <tbody>
          {currentRows?.map((user: IUser,i:any) => (
            <tr key={user?._id} className="border-b">
              <td className="border px-4">
                {i+1}
              </td>
              <td className="border px-4 py-2">
        <img
          src={user.image ? user.image : "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg"}
          alt={user?.firstName+ user?.lastName}
          className="w-16 h-16 object-cover rounded"
        />
      </td>
              <td className="border px-4 py-2 text-center">{user?.firstName + "_" + user?.lastName}</td>
              <td className="border px-4 py-2 text-center">
                {
                user?.role==="super_admin"&&  <p className="text-primary font-bold animate-pulse">{user?.role}</p>
                }
                {user?.role !=="super_admin"&& user?.role}
              </td>
              <td className="border px-4 py-2 text-center">
                ${user?.email}
              </td>
              <td className="border px-4 py-2 text-center">
               {user?.status}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDeleteProduct(user?._id)}
                  className="text-red-500"
                >
                  X
                </button>
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleUpdateClick(user)}
                  className="text-blue-500"
                >
                  {user.role === "admin"? "user":"admin"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-primary text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isModalOpen && selectedUser && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center w-full">
    <div
      className="border w-full md:w-9/12 lg:w-8/12 max-h-screen overflow-y-auto p-6 rounded-lg shadow-lg "
    >
      <h2 className="text-xl font-bold mb-4">Change Image</h2>
    
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Add your update logic here
        }}
      >
{/* show the image and upload or change the product image */}

<div className="flex bg-black w-full">
  {imageUploading ? (
    <div className="w-full flex justify-center align-middle items-center">
      <div className=" mx-auto">
      <Spinner />
      </div>
    </div>
  ) : (
    <div className="extraOutline p-4 w-max m-auto rounded-lg">
      {imagePreview ? (
        <div className="text-center">
          <img
            src={imagePreview||selectedUser.image||"https://cdn-icons-png.flaticon.com/512/1554/1554590.png"}
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


        {/* Product details form */}
        <div className="flex gap-4">
          <div className="mb-4">
            <label className="block mb-2 font-medium">Name</label>
            <input
            onChange={handleInputChange}
              type="text"
              defaultValue={selectedUser.firstName+ "_" + selectedUser.lastName}
              name="title"
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Quantity</label>
            <input
              onChange={handleInputChange}
              type="number"
              name="quantity"
              defaultValue={selectedUser.quantity}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Price ($)</label>
            <input
              onChange={handleInputChange}
              type="number"
              defaultValue={selectedUser.price}
              name="price"
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
        </div>

        <div className="mb-4 w-full">
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            onChange={handleInputChange}
            name="description"
            defaultValue={selectedUser.description}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>


        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCloseModal}
            className="bg-primary px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
          onClick={handleUpdateProduct}
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}

export default UsersManagement