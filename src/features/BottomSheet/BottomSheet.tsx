import React from 'react';
import {Platform} from 'react-native';
import {editQuantity} from '../../infrastructure/store/cartSlice';
import {removeEditingProduct} from '../../infrastructure/store/editingProductSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../infrastructure/store/hooks/hooks';
import EdditingDialog from './components/EdditingDialog';
import ProductBottomSheet from './components/ProductBottomSheet';

const BottomSheet = () => {
  const edittingProduct = useAppSelector(state => state.editingProduct.product);
  const dispatch = useAppDispatch();

  const onConfirmEdittion = (productId: number, quantity: number) => {
    dispatch(
      editQuantity({
        prodctId: productId,
        newQuantity: quantity,
      }),
    );
    dispatch(removeEditingProduct());
  };

  return edittingProduct ? (
    Platform.OS === 'ios' ? (
      <ProductBottomSheet
        product={edittingProduct}
        onDismiss={() => dispatch(removeEditingProduct())}
        onConfirmEdittion={quantity => {
          onConfirmEdittion(edittingProduct.id, quantity);
        }}
      />
    ) : (
      <EdditingDialog
        product={edittingProduct}
        onConfirmEdittion={quantity => {
          onConfirmEdittion(edittingProduct.id, quantity);
        }}
        onDismiss={() => dispatch(removeEditingProduct())}
      />
    )
  ) : (
    <></>
  );
};

export default BottomSheet;
