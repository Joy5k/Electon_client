import { useState } from "react";
import { IDiscountModalProps, IOfferProduct } from "../../../../types";



function DiscountModal({
  selectedProduct,
  handleCloseModal,
  handleDiscount,
}: IDiscountModalProps) {
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [offerStartDate, setOfferStartDate] = useState<string>("");
  const [offerEndDate, setOfferEndDate] = useState<string>("");
  const [offerType, setOfferType] = useState<"general" | "dealOfTheDay" | "other">("general");

  const handleSave = () => {
    const offerPrice = parseFloat(
      (selectedProduct.price - (selectedProduct.price * discountPercentage) / 100).toFixed(2)
    );

    // Ensure proper formatting of date-time
    const startDate = new Date(offerStartDate).toISOString();
    const endDate = new Date(offerEndDate).toISOString();

    const offerData: IOfferProduct = {
      productId: selectedProduct._id,
      offerPercentage: discountPercentage,
      offerPrice,
      offerStartDate: startDate,
      offerEndDate: endDate,
      offerType,
      offerStatus: true,
    };

    handleDiscount(offerData);
  };

  const handleDateChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // Validate and set the date-time value
      if (value) {
        setter(value);
      }
    };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="bg-gray-950 rounded-xl shadow-2xl w-full max-w-md border border-gray-800/60 animate-in fade-in-0 zoom-in-95">
      {/* Header */}
      <div className="p-6 border-b border-gray-800/60">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-100">
              Create Offer for 
              <span className="text-emerald-400 ml-2">{selectedProduct?.title}</span>
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Regular Price: 
              <span className="line-through ml-2">${selectedProduct?.price}</span>
            </p>
          </div>
          <button
            onClick={handleCloseModal}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Discount Input */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="block text-sm font-medium text-gray-300">Discount Percentage</label>
            <span className="text-xs text-emerald-400">
              New Price: $
              {(selectedProduct.price - (selectedProduct.price * discountPercentage) / 100).toFixed(2)}
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(Number(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>0%</span>
              <span className="text-emerald-400 font-medium">{discountPercentage}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Date Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Start Date</label>
            <div className="relative">
              <input
                type="datetime-local"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3
                         focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50
                         text-gray-200 placeholder-gray-500"
                value={offerStartDate}
                onChange={handleDateChange(setOfferStartDate)}
              />
              <svg className="w-5 h-5 absolute right-3 top-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">End Date</label>
            <div className="relative">
              <input
                type="datetime-local"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3
                         focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50
                         text-gray-200 placeholder-gray-500"
                value={offerEndDate}
                onChange={handleDateChange(setOfferEndDate)}
              />
              <svg className="w-5 h-5 absolute right-3 top-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Offer Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Offer Type</label>
          <div className="relative">
            <select
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3
                       focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50
                       text-gray-200 [&>option]:bg-gray-900"
              value={offerType}
              onChange={(e) => setOfferType(e.target.value as any)}
            >
              <option value="general">General Offer</option>
              <option value="dealOfTheDay">Deal of the Day</option>
              {/* <option value="other">Special Promotion</option> */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-800/60">
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCloseModal}
            className="px-6 py-2.5 rounded-lg border border-gray-700 hover:border-gray-600
                     text-gray-300 hover:text-gray-100 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500
                     text-white font-medium transform hover:scale-[1.02] transition-all
                     duration-200 shadow-lg shadow-emerald-500/10"
          >
            Activate Offer
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default DiscountModal;
