import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import cartSlice from "./slices/cartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      cart: cartSlice,
    },
  });
};
