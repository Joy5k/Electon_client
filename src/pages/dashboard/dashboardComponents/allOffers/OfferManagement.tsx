import React, { useState } from "react";
import { useAllProductsQuery } from "../../../../redux/features/admin/productManagementApi";
import { IProduct } from "../../../../types";

function OfferManagement() {
    const { data } = useAllProductsQuery({});
    const products = data?.data;

    const [isDiscountModalOpen, setDiscountModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct >({} as IProduct);
    const [discountPercentage,setDiscountPercentage]=useState<number>(0);



    const handleOpenDiscountModal = (product:IProduct) => {
        setSelectedProduct(product);
        setDiscountModalOpen(true);
    };

    const handleOpenUpdateModal = (product:IProduct) => {
        setSelectedProduct(product);
        setUpdateModalOpen(true);
    };

    const handleCloseModal = () => {
        setDiscountModalOpen(false);
        setUpdateModalOpen(false);
        setSelectedProduct({} as IProduct);
    };

    // set the discount on server
    const handleDiscount=async():Promise<void>=>{
        const discount=selectedProduct.price * discountPercentage / 100;
        console.log(discount)
        console.log(discountPercentage)
    }
    return (
        <div>
            <div>
                <table className="w-full bg-white border-collapse overflow-scroll">
                    <thead>
                        <tr className="border bg-gray-100">
                            <th className="px-4 whitespace-nowrap">No.</th>
                            <th className="px-4 whitespace-nowrap">Image</th>
                            <th className="px-4 whitespace-nowrap">Title</th>
                            <th className="px-4 whitespace-nowrap">Price ($)</th>
                            <th className="whitespace-nowrap">Status</th>
                            <th className="whitespace-nowrap">Discount (%)</th>
                            <th className="px-4 whitespace-nowrap">Deal of the day</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product:IProduct, i:number) => (
                            <tr key={product?._id} className="border-b">
                                <td className="border px-4">{i + 1}</td>
                                <td className="border px-4 py-2">
                                    <img
                                        src={product.image ? product.image : "https://cdn-icons-png.flaticon.com/512/1554/1554590.png"}
                                        alt={product?.title}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="border px-4 text-center">{product?.title}</td>
                                <td className="border px-4 text-center">${product?.price.toFixed(2)}</td>
                                <td className="border px-4 text-center">status</td>
                                <td className="border px-4 text-center">
                                    <button
                                        onClick={() => handleOpenDiscountModal(product)}
                                        className="text-primary font-bold"
                                    >
                                        Discount
                                    </button>
                                </td>
                                <td className="border px-4 text-center">
                                    <button
                                        onClick={() => handleOpenUpdateModal(product)}
                                        className="text-emerald-500 font-bold"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Discount Modal */}
            {isDiscountModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center ">
                    <div className=" p-4 rounded shadow-md w-96">
                        <h2 className="text-lg font-semibold ">Set Discount for {selectedProduct?.title}</h2>
                        {/* Add form or content here for discount */}
                       <p>Regular Price: {selectedProduct?.price}</p>
    <input 
      onChange={(e) => setDiscountPercentage(Math.max(0, Math.min(100, Number(e.target.value))))} 
      max={100} 
      min={1} 
      className="border border-gray-700 mt-2  px-2" 
      type="number" 
      name="discountPercentage" 
      
      value={discountPercentage}
      onInput={(e) => {
        const value = Number(e.currentTarget.value);
        if (value > 100) {
          e.currentTarget.value = "100";
        }
      }}
    />
                    <p className="text-gray-700">Possible Price:{selectedProduct.price - (selectedProduct.price * discountPercentage / 100)}</p>
                        <div className="flex justify-between">
                          
                        <button onClick={handleCloseModal} className="mt-4 px-2  bg-red-500 hover:bg-red-600 text-white rounded">Close</button>
                        <button onClick={handleDiscount} className="mt-4 px-2 hover:bg-emerald-700  bg-emerald-600 text-white rounded">Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Modal */}
            {isUpdateModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-md w-96">
                        <h2 className="text-lg font-semibold mb-4">Update Product: {selectedProduct?.title}</h2>
                        {/* Add form or content here for updating */}
                        <button onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OfferManagement;
