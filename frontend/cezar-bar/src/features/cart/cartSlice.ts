import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface CartState {
  cart: CartItem[];
  totalPrice: number;
  numItems: number;
}

export const initialState: CartState = {
  cart: [],
  totalPrice: 0,
  numItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.totalPrice += existingItem.price * item.quantity;
        state.totalPrice += existingItem.price * item.quantity;
      } else {
        state.cart.push(item);
        state.totalPrice += item.price * item.quantity;
        state.numItems++;
      }
      saveStateToLocalStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        if (existingItem.quantity === 0) {
          state.cart = state.cart.filter((i) => i.id !== item.id);
        }
      }
      state.totalPrice -= item.price;
      state.numItems--;
      saveStateToLocalStorage(state);
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.cart.find((i) => i.id === action.payload.id);
      if (item) {
        state.totalPrice -= item.totalPrice;
        state.numItems--;
        state.cart = state.cart.filter((i) => i.id !== action.payload.id);
        saveStateToLocalStorage(state);
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalPrice = 0;
      state.numItems = 0;
      saveStateToLocalStorage(state);
    },
    changeQuantity: (
      state,
      action: PayloadAction<{ id: number; payload: number }>,
    ) => {
      const item = state.cart.find((i) => i.id === action.payload.id);
      if (item) {
        if (item.quantity === 1 && action.payload.payload === -1) {
          state.cart = state.cart.filter((i) => i.id !== action.payload.id);
          state.totalPrice -= item.totalPrice;
          state.numItems--;
        } else {
          const quantity = action.payload.payload;
          item.quantity += quantity;
          item.totalPrice += action.payload.payload * item.price;
          state.totalPrice += action.payload.payload * item.price;
        }
        saveStateToLocalStorage(state);
      }
    },
  },
});

export default cartSlice.reducer;

export const {
  addToCart,
  removeFromCart,
  clearCart,
  removeItem,
  changeQuantity,
} = cartSlice.actions;

export function getCart(state: { cart: CartState }) {
  return state.cart.cart;
}

export function getTotalPrice(state: { cart: CartState }) {
  return state.cart.totalPrice;
}

export function getCartItemById(state: { cart: CartState }, id: number) {
  return state.cart.cart.find((i) => i.id === id);
}

export function getFullCart(state: { cart: CartState }) {
  return state.cart;
}

export function getCartItemQuantityById(
  state: { cart: CartState },
  id: number,
) {
  return state.cart.cart.find((i) => i.id === id)?.quantity;
}

// LocalStorage
export const saveStateToLocalStorage = (state: CartState): void => {
  const serializedState = JSON.stringify({
    cart: state,
    timestamp: new Date().getTime(),
  });
  localStorage.setItem("cart", serializedState);
};

export const loadStateFromLocalStorage = (): CartState | undefined => {
  const serializedState = localStorage.getItem("cart");
  if (!serializedState) return undefined;

  const savedState = JSON.parse(serializedState);
  const currentTime = new Date().getTime();

  if (currentTime - savedState.timestamp > 600000) {
    localStorage.removeItem("cart");
    return undefined;
  }
  return savedState.cart;
};
