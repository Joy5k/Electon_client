import { useState } from "react";
import { toast } from "sonner";
import {
  useDeleteOfferedProductMutation,
  useGetAllOfferedProductsQuery,
  useUpdateAllDiscountMutation,
} from "../../../../redux/features/offers/offerManagement";
import { IOfferProduct } from "../../../../types";

interface UpdateModalProps {
  product: IOfferProduct;
  onClose: () => void;
}



function AllOfferedProducts() {
  const { data } = useGetAllOfferedProductsQuery({});
  const products = data?.data;
  const [deleteOfferedProduct] = useDeleteOfferedProductMutation();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IOfferProduct | null>(
    null
  );

  const handleOfferedProductDelete = async (id: string) => {
    const res = await deleteOfferedProduct(id).unwrap();
    if (res.success) {
      toast.success("Offered product deleted successfully");
    }
  };

  const handleOfferedProductUpdate = (product: IOfferProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <div className="my-10">
        {products?.length && (
          <h3 className="text-2xl font-semibold my-3">
            All products that are already offered on the electon
          </h3>
        )}
        <div>
          <div>
            {products?.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="border px-4 py-2">No</th>
                    <th className="border px-4 py-2">Image</th>
                    <th className="border px-4 py-2">Title</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Offer-Price</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Offer Type</th>
                    <th className="border px-4 py-2">Discount</th>
                    <th className="border px-4 py-2">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: IOfferProduct, i: number) => (
                    <tr key={i} className="border-b">
                      <td className="border px-4">{i + 1}</td>
                      <td className="border px-4 py-2">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1554/1554590.png"
                          alt="product title"
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="border px-4 text-center">
                        {product.productId?.title as string}
                      </td>
                      <td className="border px-4 text-center">
                        {product?.productId?.price}
                      </td>
                      <td className="border px-4 text-center">
                        {product?.offerPrice}
                      </td>
                      <td className="border px-4 text-center">
                        {product?.offerStatus ? (
                          <p className="text-emerald-600 font-semibold">
                            Active
                          </p>
                        ) : (
                          <p className="text-primary font-sans font-bold">
                            Off
                          </p>
                        )}
                      </td>
                      <td className="border px-4 text-center">
                        {product?.offerType}
                      </td>
                      <td className="border px-4 text-center">
                        <button
                          onClick={() =>
                            handleOfferedProductDelete(product._id!)
                          }
                          className="text-primary font-bold"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="border px-4 text-center">
                        <button
                          onClick={() => handleOfferedProductUpdate(product)}
                          className="text-emerald-500 font-bold"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-primary text-3xl text-center animate-pulse mt-10 font-bold">
                There is no offered product
              </p>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && selectedProduct && (
        <UpdateModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
}



function UpdateModal({ product, onClose }: UpdateModalProps) {
  const [updateDealOfTheDay] = useUpdateAllDiscountMutation();
  const [offerPrice, setOfferPrice] = useState<number>(product?.offerPrice || 0);
  const [offerPercentage, setOfferPercentage] = useState<number>(
    product?.offerPercentage || 0
  );
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [offerStartDate, setOfferStartDate] = useState(product?.offerStartDate);
  const [offerEndDate, setOfferEndDate] = useState(product?.offerEndDate);

  // Handle offer percentage change and update offer price
  const handlePercentageChange = (value: number) => {
    setOfferPercentage(value);
    const newOfferPrice = product?.productId?.price - (product?.productId?.price * value) / 100;
    setOfferPrice(parseFloat(newOfferPrice.toFixed(2)));
  };

  // Handle offer price change and update offer percentage
  const handlePriceChange = (value: number) => {
    setOfferPrice(value);
    const newOfferPercentage =
      ((product?.productId?.price - value) / product?.productId?.price) * 100;
    setOfferPercentage(parseFloat(newOfferPercentage.toFixed(2)));
  };


  const handleSubmit =async (e: React.FormEvent) => {
  
    e.preventDefault(); 
     const updatedData = {
      id: product._id,
      data: {
        offerPrice,
        offerPercentage,
        offerType: selectedValue,
      },
    }
    
    const response=await updateDealOfTheDay(updatedData).unwrap();
    if(response.success){
      toast.success(` ${product.productId?.title}  updated successfully`);
      onClose();
    }

  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black  bg-opacity-80 ">
      <div className=" p-6 rounded shadow-2xl w-96 border border-primary  shadow-primary">
        <h3 className="text-xl font-bold mb-4">Update Product</h3>
        <p className="mb-4">Title: {product?.productId?.title}</p>
        <p className="">Price: {product?.productId?.price}</p>
<hr className=" bg-primary p-[1px] animate-pulse" />
        <form onSubmit={handleSubmit}>
        <div className="mb-4 mt-1 ">
        <label htmlFor="offerPercentage">Offer %:</label>
        <input
          className="border w-24 px-2 ml-[26px] border-gray-800"
          type="number"
          name="offerPercentage"
          id="offerPercentage"
          value={offerPercentage}
          onChange={(e) => handlePercentageChange(Number(e.target.value))}
          placeholder="Offer Percentage"
        />
      </div>
      <div className="">
        <label htmlFor="offerPrice">Offer-Price:</label>
        <input
          className="border w-24 px-2 ml-1 border-gray-800"
          type="number"
          name="offerPrice"
          id="offerPrice"
          value={offerPrice}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          placeholder="Offer Price"
        />
      </div>

      <div className="h-full mt-3">
        <label htmlFor="offerType">Offer-Type:</label>
        <select
          className="border mt-1 ml-1 border-gray-800  "
          name="offerType"
          id="offerType"
          value={"offerType"}
          onChange={  (event)=> setSelectedValue(event.target.value)}
        >
          <option value="general">General</option>
          <option value="dealOfTheDay">Deal Of The Day</option>
          <option value="other">Other</option>
        </select>
      </div>

     
      <label className="block mt-4">
  <span className="text-sm font-medium">Offer Start Date & Time</span>
  <input
    type="datetime-local"
    className="border border-gray-700 mt-2 px-2 w-full"
    value={
      offerStartDate
        ? new Date(offerStartDate).toISOString().slice(0, 16) // Convert to 'YYYY-MM-DDTHH:mm'
        : ''
    }
    onChange={(e) => setOfferStartDate(e.target.value)}
  />
</label>

<label className="block mt-4">
  <span className="text-sm font-medium">Offer End Date & Time</span>
  <input
    type="datetime-local"
    className="border border-gray-700 mt-2 px-2 w-full"
    value={
      offerEndDate
        ? new Date(offerEndDate).toISOString().slice(0, 16) // Convert to 'YYYY-MM-DDTHH:mm'
        : ''
    }
    onChange={(e) => setOfferEndDate(e.target.value)}
  />
</label>


        <div className="flex justify-end mt-5">
          <button
            onClick={onClose}
            className="border hover:bg-slate-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
            Submit
      </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default AllOfferedProducts;
