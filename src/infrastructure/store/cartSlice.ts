import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CartProduct {
  id: number;
  quantity: number;
}

interface CartState {
  cart: CartProduct[];
  error?: string;
  loading: boolean;
}

const initialState: CartState = {
  cart: [],
  error: undefined,
  loading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementQuantity(state, action: PayloadAction<number>) {
      const cartItem = state.cart.find(prod => prod.id === action.payload);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.cart.push({id: action.payload, quantity: 1});
      }
      console.log('onAddProduct. Cart: ', action.payload);
    },
    decrementQuantity(state, action: PayloadAction<number>) {
      const cartItem = state.cart.find(prod => prod.id === action.payload);
      if (cartItem) {
        cartItem.quantity -= 1;
        state.cart = state.cart.filter(it => it.quantity !== 0);
      }
    },
    editQuantity(
      state,
      action: PayloadAction<{prodctId: number; newQuantity: number}>,
    ) {
      const cartItem = state.cart.find(
        prod => prod.id === action.payload.prodctId,
      );
      if (cartItem) {
        cartItem.quantity = action.payload.newQuantity;
      } else {
        state.cart.push({id: action.payload.prodctId, quantity: 1});
      }
      state.cart = state.cart.filter(it => it.quantity !== 0);
    },
    cleanCart(state) {
      state.cart = [];
    },
  },
});

export const {incrementQuantity, decrementQuantity, editQuantity, cleanCart} =
  cartSlice.actions;
export default cartSlice.reducer;
