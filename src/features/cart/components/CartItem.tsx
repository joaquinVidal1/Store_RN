import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StyleProps} from 'react-native-reanimated';
import {Product} from '../../products/components/ProductsList';
import {colors} from '../../shared/colors';

export type Props = {
  product: Product;
  style: StyleProps;
  onPress?: () => void;
};

const CartItem: React.FC<Props> = ({product, style, onPress}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image
        source={{uri: product.checkoutImageUrl}}
        style={styles.iamge}
        defaultSource={require('../../../../res/placeholder.jpg')}
      />
      <View style={styles.nameAndPriceContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>
          {'$' + product.price?.toFixed(2) || '0'}
        </Text>
      </View>
      <Text style={styles.units}>{product.quantity + ' units'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 150,
    flex: 1,
    maxWidth: 180,
  },
  iamge: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 4,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.primaryColor,
    marginStart: 8,
  },
  productPrice: {
    color: colors.secondaryColor,
    fontSize: 16,
    marginEnd: 12,
  },
  units: {
    color: colors.secondaryColor,
    fontSize: 16,
    marginTop: 8,
    marginStart: 8,
  },
  nameAndPriceContainer: {
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default CartItem;
