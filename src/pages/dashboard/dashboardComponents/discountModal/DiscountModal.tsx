import { useState } from "react";
import { IOfferProduct } from "../../../../types";

interface DiscountModalProps {
  selectedProduct: { _id: string; title: string; price: number };
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

function DiscountModal({
  selectedProduct,
  handleCloseModal,
  handleDiscount,
}: DiscountModalProps) {
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [offerStartDate, setOfferStartDate] = useState<string>("");
  const [offerEndDate, setOfferEndDate] = useState<string>("");
  const [offerType, setOfferType] = useState<"general" | "dealOfTheDay" | "other">("general");

  const handleSave = () => {
    if (!offerStartDate || !offerEndDate) {
      alert("Please select valid start and end dates.");
      return;
    }

    const offerPrice = parseFloat(
      (selectedProduct.price - (selectedProduct.price * discountPercentage) / 100).toFixed(2)
    );

    const offerData: IOfferProduct = {
      productId: selectedProduct._id,
      offerPercentage: discountPercentage,
      offerPrice,
      offerStartDate: new Date(offerStartDate).toISOString(),
      offerEndDate: new Date(offerEndDate).toISOString(),
      offerType,
      offerStatus: true,
    };

    handleDiscount(offerData);
  };

  const handleDateChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="p-4 bg-white rounded shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">
          Set Discount for {selectedProduct?.title}
        </h2>
        <p className="mb-4">Regular Price: ${selectedProduct?.price}</p>
        <label className="block">
          <span className="text-sm font-medium">Discount Percentage</span>
          <input
            type="number"
            className="border border-gray-700 mt-2 px-2 w-full"
            value={discountPercentage}
            min={0}
            max={100}
            onChange={(e) =>
              setDiscountPercentage(Math.max(0, Math.min(100, Number(e.target.value))))
            }
          />
        </label>
        <p className="text-gray-700 mt-2">
          Possible Price: $ 
          {(selectedProduct.price - (selectedProduct.price * discountPercentage) / 100).toFixed(2)}
        </p>

        <label className="block mt-4">
          <span className="text-sm font-medium">Offer Start Date & Time</span>
          <input
            type="datetime-local"
            className="border border-gray-700 mt-2 px-2 w-full"
            value={offerStartDate}
            onChange={handleDateChange(setOfferStartDate)}
          />
        </label>

        <label className="block mt-4">
          <span className="text-sm font-medium">Offer End Date & Time</span>
          <input
            type="datetime-local"
            className="border border-gray-700 mt-2 px-2 w-full"
            value={offerEndDate}
            onChange={handleDateChange(setOfferEndDate)}
          />
        </label>

        <label className="block mt-4">
          <span className="text-sm font-medium">Offer Type</span>
          <select
            className="border border-gray-700 mt-2 px-2 w-full"
            value={offerType}
            onChange={(e) =>
              setOfferType(e.target.value as "general" | "dealOfTheDay" | "other")
            }
          >
            <option value="general">General</option>
            <option value="dealOfTheDay">Deal of The Day</option>
            <option value="other">Other</option>
          </select>
        </label>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default DiscountModal;
