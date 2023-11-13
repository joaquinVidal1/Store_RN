import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ProductListItem from '../../products/components/ProductListItem';
import {Product} from '../../products/components/ProductsList';
import {colors} from '../../shared/colors';
import ConfirmationButton from './ConfirmationButton';

const ProductBottomSheet = ({
  product,
  reference,
  onConfirmEdittion,
}: {
  product: Product;
  reference: React.RefObject<BottomSheetModal>;
  onConfirmEdittion: (newQuantity: number) => void;
}) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(quantity - 1);
  };

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModal
      ref={reference}
      snapPoints={['39%']}
      onChange={handleSheetChanges}>
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
    flexDirection: 'column',
  },
  confirmationButton: {
    backgroundColor: '#6DAE43',
    marginTop: 24,
    marginHorizontal: 18,
  },
});

export default ProductBottomSheet;
