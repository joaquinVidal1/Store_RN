import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit/dist/createAction';
import {Product} from '../../features/products/types/Product';

interface EditingProductState {
  product?: Product;
}

const initialState: EditingProductState = {
  product: undefined,
};

const editingProductSlice = createSlice({
  name: 'editingProduct',
  initialState,
  reducers: {
    setEdditingProduct(state, action: PayloadAction<Product>) {
      state.product = action.payload;
    },
    removeEditingProduct(state) {
      state.product = undefined;
    },
  },
});

export const {setEdditingProduct, removeEditingProduct} =
  editingProductSlice.actions;
export default editingProductSlice.reducer;
