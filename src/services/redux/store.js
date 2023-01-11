import { configureStore } from "@reduxjs/toolkit";

// slices
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";
import productsSlice from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
