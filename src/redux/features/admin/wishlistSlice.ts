import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../types";

interface WishlistState {
  items: IProduct[];
}

const initialState: WishlistState = {
  items: JSON.parse(localStorage.getItem("wishlist") || "[]"), // Load from localStorage initially
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<IProduct>) => {
        const productExists = state.items.find((item) => item._id === action.payload._id);
      
        if (productExists) {
          // Safely increment the userSelectedQuantity
          productExists.userSelectedQuantity = (productExists.userSelectedQuantity || 0) + 1;
        } else {
          // Add the product to the wishlist with userSelectedQuantity initialized to 1
          state.items.push({ ...action.payload, userSelectedQuantity: 1 });
        }
      
        // Save updated wishlist to localStorage
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      },
      
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);

      // Save updated list to localStorage
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
