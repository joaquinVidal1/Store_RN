import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../shared/colors';
import AddButton from './AddButton';
import {Product} from './ProductsList';

const ProductListItem = ({
  product,
  onAddProduct,
  onRemoveProduct,
}: {
  product: Product;
  onAddProduct: (product: Product) => void;
  onRemoveProduct: (product: Product) => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: product.listImageUrl}}
          style={styles.productImage}
          defaultSource={require('../../../../res/placeholder.jpg')}
        />
        <View style={styles.textsContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        </View>
      </View>
      <AddButton
        quantity={product.quantity}
        onAddProduct={() => onAddProduct(product)}
        onRemoveProduct={() => onRemoveProduct(product)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    justifyContent: 'space-between',
    width: '100%',
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
