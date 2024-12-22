import { useState } from "react";
import { IOfferProduct } from "../../../../types";


interface DiscountModalProps {

    selectedProduct: { _id:string,title: string; price: number };
  
    handleCloseModal: () => void;
  
    handleDiscount: (offerData: {
  
      productId: string;
  
      offerPercentage: number;
  
      offerPrice: number;
  
      offerStartDate: string;
  
      offerEndDate: string;
  
      offerType: "general" | "dealOfTheDay" | "other";
  
      offerStatus: boolean;
  
    }) => void;
  
  }
  

function DiscountModal({ selectedProduct, handleCloseModal, handleDiscount }: DiscountModalProps) {
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [offerStartDate, setOfferStartDate] = useState("");
  const [offerEndDate, setOfferEndDate] = useState("");
  const [offerType, setOfferType] = useState<"general" | "dealOfTheDay" | "other">("general"); // Default value

  const handleSave = () => {
    const offerData:IOfferProduct = {
     productId: selectedProduct?._id,
      offerPercentage:discountPercentage,
      offerPrice:parseFloat((selectedProduct.price - (selectedProduct.price * discountPercentage) / 100).toFixed(2)),
      offerStartDate,
      offerEndDate,
      offerType,
      offerStatus:true
    };
    handleDiscount(offerData);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="p-4 rounded shadow-md w-96 ">
        <h2 className="text-lg font-semibold">
          Set Discount for {selectedProduct?.title}
        </h2>
        <p>Regular Price: {selectedProduct?.price}</p>
        <input
          onChange={(e) =>
            setDiscountPercentage(Math.max(0, Math.min(100, Number(e.target.value))))
          }
          max={100}
          min={1}
          className="border border-gray-700 mt-2 px-2 w-full"
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
        <p className="text-gray-700">
          Possible Price:{" "}
          {selectedProduct?.price -
            (selectedProduct?.price * discountPercentage) / 100}
        </p>

        <label className="block mt-4">
          <span className="text-sm font-medium">Offer Start Date & Time</span>
          <input
            type="datetime-local"
            className="border border-gray-700 mt-2 px-2 w-full"
            value={offerStartDate}
            onChange={(e) => setOfferStartDate(e.target.value)}
          />
        </label>

        <label className="block mt-4">
          <span className="text-sm font-medium">Offer End Date & Time</span>
          <input
            type="datetime-local"
            className="border border-gray-700 mt-2 px-2 w-full"
            value={offerEndDate}
            onChange={(e) => setOfferEndDate(e.target.value)}
          />
        </label>

        <label className="block mt-4">
          <span className="text-sm font-medium">Offer Type</span>
          <select
            className="border border-gray-700 mt-2 px-2 w-full"
            value={offerType}
            onChange={(e) => setOfferType(e.target.value as "general" | "dealOfTheDay" | "other")}
          >
            <option value="general">General</option>
            <option value="dealOfTheDay">Deal of The Day</option>
            <option value="other">Other</option>
          </select>
        </label>

        <div className="flex  flex-col md:flex-row lg:flex-row justify-between mt-6">
          <button
            onClick={handleCloseModal}
            className="px-2 bg-red-500 hover:bg-red-600 text-white rounded w-full md:w-20 lg:w-28 "
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="px-2 hover:bg-emerald-700 bg-emerald-600 text-white rounded w-full md:w-20 lg:w-28 "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default DiscountModal;
