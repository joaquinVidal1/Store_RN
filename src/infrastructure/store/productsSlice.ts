import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ApiProduct} from '../api';

interface CartProduct {
  id: number;
  quantity: number;
}

interface ProductsState {
  cart: CartProduct[];
  error?: string;
  loading: boolean;
}

const initialState: ProductsState = {
  cart: [],
  error: undefined,
  loading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    incrementQuantity(state, action: PayloadAction<number>) {
      const product = state.cart.find(prod => prod.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity(state, action: PayloadAction<number>) {
      const product = state.cart.find(prod => prod.id === action.payload);
      if (product) {
        product.quantity -= 1;
      }
    },
    setProducts(state, action: PayloadAction<ApiProduct[]>) {
      state.cart = action.payload.map(product => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          checkoutImageUrl: product.checkoutImageUrl,
          listImageUrl: product.listImageUrl,
          quantity: 0,
        };
      });
    },
  },
});

export const {incrementQuantity, decrementQuantity, setProducts} =
  productsSlice.actions;
export default productsSlice.reducer;
