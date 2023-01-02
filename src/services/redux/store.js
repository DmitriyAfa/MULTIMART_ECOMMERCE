import { configureStore } from "@reduxjs/toolkit";

// slices
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});
