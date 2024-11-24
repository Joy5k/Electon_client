import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../types";


interface WishlistState {
  items: IProduct[]; // Adjust `Product` to match your Product interface
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
      if (!productExists) {
        state.items.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.items)); // Save to localStorage
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items)); // Save updated list
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
