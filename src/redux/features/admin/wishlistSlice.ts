import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../types";

interface WishlistState {
  items: IProduct[];
  searchTerm:string
}

const initialState: WishlistState = {
  items: JSON.parse(localStorage.getItem("wishlist") || "[]"),
  searchTerm:"" // Load from localStorage initially
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<IProduct>) => {
      // Check if the product already exists in the wishlist
      const productIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
    
      if (productIndex !== -1) {
        // Product exists; increment userSelectedQuantity
        const existingProduct = state.items[productIndex];
        state.items[productIndex] = {
          ...existingProduct,
          userSelectedQuantity:
            (existingProduct.userSelectedQuantity || 0) + action.payload.userSelectedQuantity!,
        };
      } else {
        // Add the product to the wishlist as a new entry
        state.items.push({
          ...action.payload,
          userSelectedQuantity: action.payload.userSelectedQuantity, // Initialize quantity to 1
        });
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
      removeAllProductsFromWishlist: (state, action: PayloadAction<string>) => {
        if (action.payload === "") {
          state.items = []; // Clear all items if the payload is empty
        } else {
          state.items = state.items.filter(
            (item) => item._id !== action.payload
          );
        }},
        setSearchQuery:(state,action:PayloadAction<string>)=>{
          state.searchTerm=action.payload
            localStorage.setItem("searchTerm",action.payload)


        }
  }
});

export const { addToWishlist, removeFromWishlist,updateQuantity,removeAllProductsFromWishlist ,setSearchQuery} = wishlistSlice.actions;
export default wishlistSlice.reducer;
