import  { useEffect, useState } from "react";
import { toast } from "sonner";

import { useDeleteProductMutation } from "../../../redux/features/admin/productManagementApi";
import {  IUser } from "../../../types";
import { useCreateAdminMutation, useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserStatusMutation } from "../../../redux/features/admin/userManagementApi";
import Spinner from "../../../components/Spinner/Spinner";


function UsersManagement() {
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserStatus]=useUpdateUserStatusMutation()
  const [changeRole]=useCreateAdminMutation()


  const {data}=useGetAllUsersQuery({})
     const [selectedUser, setSelectedUser] = useState<any>(null);
    const [user,setUser]=useState<IUser>()

      useEffect(() => {
        if (selectedUser) {
          setUser({
            firstName: selectedUser.title || "",
            lastName: selectedUser.description || "",
            image: selectedUser.image || "",
            email: selectedUser.price || 0,
            role: selectedUser.quantity || 0,
            status: selectedUser.color || [],
            _id: selectedUser.rating,
          
          });
        }
      }, [selectedUser]);
  

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  // Calculate pagination variables
  const totalPages = Math.ceil(data?.data?.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.data.slice(indexOfFirstRow, indexOfLastRow);

  
    // Only update product when sellerId changes
  // Deleting product

  const handleUserDelete = async (id: string) => {
    const res = await deleteUser(id).unwrap();

    if (res?.success) {
      toast.success("user deleted successfully");
    }
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

  // update product function
  const handleUserRoleChange=async()=>{
  
   try {
    const res=await changeRole({}).unwrap();
    if(res.success){
      toast.success("user role changed successfully")
      setIsModalOpen(false);
      setSelectedUser(null);
    }
   } catch (error) {
    toast.error("Something went wrong")
   }
  }
const handleUserStatus=async(id:string)=>{
  const res=await updateUserStatus(id).unwrap()
  if(res.success){
    toast.success("user status has been changed")
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
              <td onClick={()=>handleUserStatus(user?._id)} className="border px-4 py-2 text-center cursor-pointer">
               {user?.status}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleUserDelete(user?._id)}
                  className="text-red-500"
                >
                  X
                </button>
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleUserRoleChange()}
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
    
      <form>
{/* show the image and upload or change the product image */}

<div className="flex bg-black w-full">
 
  
</div>
     
      </form>
    </div>
  </div>
)}

    </div>
  );
}

export default UsersManagement