import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  decrementQuantity,
  incrementQuantity,
} from '../../../infrastructure/store/cartSlice';
import {useAppDispatch} from '../../../infrastructure/store/hooks/hooks';
import {colors} from '../../shared/colors';
import AddButton from './AddButton';
import {Product} from './ProductsList';

const ProductListItem = ({product}: {product: Product}) => {
  const dispatch = useAppDispatch();

  const onAddProduct = () => {
    dispatch(incrementQuantity(product.id));
  };

  const onRemoveProduct = () => {
    dispatch(decrementQuantity(product.id));
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: product.listImageUrl}}
          style={styles.productImage}
        />
        <View style={styles.textsContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>
        </View>
      </View>
      <AddButton
        quantity={product.quantity}
        onAddProduct={onAddProduct}
        onRemoveProduct={onRemoveProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 18,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  productImage: {
    width: 56,
    height: 56,
    borderRadius: 50,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    color: colors.primaryColor,
  },
  productPrice: {
    fontSize: 16,
    color: colors.secondaryColor,
  },
  textsContainer: {
    flexDirection: 'column',
    marginStart: 24,
  },
});

export default ProductListItem;
