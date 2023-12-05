import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ConfirmationButton from '../../cart/components/ConfirmationButton';
import ProductListItem from '../../products/components/ProductListItem';
import {Product} from '../../products/types/Product';
import {colors} from '../../shared/colors';

const Backdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
);

const ProductBottomSheet = ({
  product,
  onConfirmEdittion,
  onDismiss,
}: {
  product: Product;
  onConfirmEdittion: (newQuantity: number) => void;
  onDismiss: () => void;
}) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const bottomSheetModalRef: React.RefObject<BottomSheetModal> =
    useRef<BottomSheetModal>(null);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    product
      ? bottomSheetModalRef.current?.present()
      : bottomSheetModalRef.current?.close();
  }, [product]);

  return (
    <BottomSheetModal
      backdropComponent={Backdrop}
      ref={bottomSheetModalRef}
      snapPoints={['39%']}
      onDismiss={onDismiss}>
      <View style={styles.container}>
        <Text style={styles.ttile}>Edit item count</Text>
        <ProductListItem
          product={{...product, quantity: quantity}}
          onAddProduct={() => incrementQuantity()}
          onRemoveProduct={() => decrementQuantity()}
        />
        <ConfirmationButton
          onPress={() => onConfirmEdittion(quantity)}
          text={'Confirm'}
          style={styles.confirmationButton}
        />
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  ttile: {
    fontWeight: 'bold',
    color: colors.primaryColor,
    fontSize: 18,
    marginVertical: 24,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  confirmationButton: {
    backgroundColor: '#6DAE43',
    marginTop: 24,
    marginHorizontal: 18,
  },
});

export default ProductBottomSheet;
