import React, { useState } from "react";
import { toast } from "sonner";
import { useDeleteProductMutation } from "../../redux/features/admin/productManagementApi";

const ProductTable = ({ products }: any) => {
  const [deleteProduct] = useDeleteProductMutation();

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Calculate pagination variables
  const totalPages = Math.ceil(products.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = products.slice(indexOfFirstRow, indexOfLastRow);

  // Deleting product
  const handleDeleteProduct = async (id: string) => {
    const res = await deleteProduct(id).unwrap();

    if (res?.success) {
      toast.success("Product deleted successfully");
    }
  };

  // Opening the modal
  const handleUpdateClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-x-auto mr-5">
      <table className="w-full bg-white border-collapse overflow-scroll">
        <thead>
          <tr className="border bg-gray-100">
            <th className="px-4 py-2 whitespace-nowrap">No.</th>
            <th className="px-4 py-2 whitespace-nowrap">Image</th>
            <th className="px-4 py-2 whitespace-nowrap">Title</th>
            <th className="whitespace-nowrap">Quantity</th>
            <th className="px-4 py-2 whitespace-nowrap">Price ($)</th>
            <th className="px-4 py-2 whitespace-nowrap">Seller Name</th>
            <th className="whitespace-nowrap">Delete</th>
            <th className="px-4 py-2 whitespace-nowrap">Update</th>
          </tr>
        </thead>
        <tbody>
          {currentRows?.map((product: any,i:any) => (
            <tr key={product?._id} className="border-b">
              <td className="border px-4">
                {i+1}
              </td>
              <td className="border px-4 py-2">
                <img
                  src={
                    product.image ||
                    "https://cdn-icons-png.flaticon.com/512/1554/1554590.png"
                  }
                  alt={product?.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="border px-4 py-2 text-center">{product?.title}</td>
              <td className="border px-4 py-2 text-center">
                {product?.quantity}
              </td>
              <td className="border px-4 py-2 text-center">
                ${product?.price.toFixed(2)}
              </td>
              <td className="border px-4 py-2 text-center">
                {product?.sellerId?.firstName} {product?.sellerId?.lastName}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDeleteProduct(product?._id)}
                  className="text-red-500"
                >
                  X
                </button>
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleUpdateClick(product)}
                  className="text-blue-500"
                >
                  Update
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

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center w-full">
          <div className=" w-full md:w-9/12 lg:w-8-12 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>
            <form>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Title</label>
                <input
                  type="text"
                  defaultValue={selectedProduct.title}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Quantity</label>
                <input
                  type="number"
                  defaultValue={selectedProduct.quantity}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Price ($)</label>
                <input
                  type="number"
                  defaultValue={selectedProduct.price}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded"
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
};

export default ProductTable;
