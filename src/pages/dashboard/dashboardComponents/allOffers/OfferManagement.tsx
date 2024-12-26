import  { useState } from "react";
import { useAllProductsQuery } from "../../../../redux/features/admin/productManagementApi";
import { IOfferProduct, IProduct } from "../../../../types";
import DiscountModal from "../discountModal/DiscountModal";
import { useCreateDiscountMutation } from "../../../../redux/features/offers/offerManagement";
import { toast } from "sonner";
import AllOfferedProducts from "./AllOfferedProducts";

function OfferManagement() {
    const { data } = useAllProductsQuery({});
    const products = data?.data;
    const [submitProductDiscount]=useCreateDiscountMutation()
    const [isDiscountModalOpen, setDiscountModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct & { _id: string }>({ _id: "", title: "", price: 0 } as IProduct & { _id: string });
   



    const handleOpenDiscountModal = (product: IProduct & { _id: string }) => {
        setSelectedProduct(product);
        setDiscountModalOpen(true);
    };

    const handleOpenUpdateModal = (product: IProduct & { _id: string }) => {
        setSelectedProduct(product);
        setUpdateModalOpen(true);
    };

    const handleCloseModal = () => {
        setDiscountModalOpen(false);
        setUpdateModalOpen(false);
        setSelectedProduct({ _id: "", title: "", price: 0 } as IProduct & { _id: string });
    };

    // set the discount on server
    const handleDiscount=async(offerData: { offerPercentage: number; offerStartDate: string; offerEndDate: string; offerType: "general" | "dealOfTheDay" | "other"; }):Promise<void>=>{
        const offerProduct: IOfferProduct = {
            productId: selectedProduct._id!,
            offerPrice: selectedProduct.price * (1 - offerData.offerPercentage / 100),
            offerStatus:true,
            ...offerData
        };
        try {
         const res= await submitProductDiscount(offerProduct).unwrap()
            if(res.success){
                toast.success("Discount set successfully")
                handleCloseModal()
            }
        } catch (error) {
            console.log(error)
        }
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
                        {products?.map((product: IProduct & { _id: string }, i: number) => (
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
           
            <DiscountModal selectedProduct={selectedProduct} handleCloseModal={handleCloseModal} handleDiscount={handleDiscount} />
            )}

            {/* Update Modal */}
            {isUpdateModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className=" p-4 rounded shadow-md w-96">
                        <h2 className="text-lg font-semibold mb-4">Update Product: {selectedProduct?.title}</h2>
                        {/* Add form or content here for updating */}
                        <button onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
                    </div>
                </div>
            )}
            {/* the all offer component */}
            <hr className="text-red-300 border" />
                <div className="mt-4">
                    <AllOfferedProducts />
                </div>
            </div>
    );
}

export default OfferManagement;
