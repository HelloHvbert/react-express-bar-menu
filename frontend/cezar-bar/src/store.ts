import { configureStore } from "@reduxjs/toolkit";
import cartReducer, {
  initialState,
  loadStateFromLocalStorage,
} from "./features/cart/cartSlice";

const persistedState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: persistedState || initialState,
  },
});

export default store;
