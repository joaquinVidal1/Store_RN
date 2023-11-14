import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ProductListItem from '../../products/components/ProductListItem';
import {Product} from '../../products/components/ProductsList';
import {colors} from '../../shared/colors';
import ConfirmationButton from './ConfirmationButton';

const Backdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
);

const ProductBottomSheet = ({
  product,
  reference,
  onConfirmEdittion,
  onDismiss,
}: {
  product: Product;
  reference: React.RefObject<BottomSheetModal>;
  onConfirmEdittion: (newQuantity: number) => void;
  onDismiss: () => void;
}) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(quantity - 1);
  };

  return (
    <BottomSheetModal
      backdropComponent={Backdrop}
      ref={reference}
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
