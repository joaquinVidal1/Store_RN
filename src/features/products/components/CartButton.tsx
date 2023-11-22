import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import EnabledShoppingCart from '../../../../res/shopping-cart-enabled.svg';
import ShoppingCart from '../../../../res/shopping-cart.svg';

const CartButton = ({
  isEnabled,
  onPress,
}: {
  isEnabled: boolean;
  onPress: () => void;
}) => {
  const cartImage = isEnabled ? (
    <ShoppingCart />
  ) : (
    <TouchableOpacity onPress={onPress}>
      <EnabledShoppingCart />
    </TouchableOpacity>
  );

  return <View style={styles.cartButton}>{cartImage}</View>;
};

const styles = StyleSheet.create({
  cartButton: {
    marginEnd: 29,
  },
});

export default CartButton;
