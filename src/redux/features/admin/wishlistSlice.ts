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
    updateQuantity: (state, action: PayloadAction<{ _id: string; type: 'increment' | 'decrement' }>) => {
        const product = state.items.find((item) => item._id === action.payload._id);
        
        if (product) {
          // Ensure userSelectedQuantity is initialized
          product.userSelectedQuantity = product.userSelectedQuantity || 0;
  
          if (action.payload.type === 'increment') {
            product.userSelectedQuantity += 1;
          } else if (action.payload.type === 'decrement' && product.userSelectedQuantity > 0) {
            product.userSelectedQuantity -= 1;
          }
        }
      },

  }
});

export const { addToWishlist, removeFromWishlist,updateQuantity } = wishlistSlice.actions;
export default wishlistSlice.reducer;
