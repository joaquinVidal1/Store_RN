import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {BounceInUp, BounceOutDown} from 'react-native-reanimated';
import {Product} from '../../products/types/Product';
import {MARGIN_BETWEEN_COLUMNS} from '../CartScreen';
import CartItem from './CartItem';

export type Props = {
  product: Product;
  onPress: () => void;
  showMargin: boolean;
};

const AnimatedCartItem: React.FC<Props> = ({onPress, showMargin, product}) => {
  return (
    <Animated.View
      style={[
        styles.productStyle,
        showMargin && {marginEnd: MARGIN_BETWEEN_COLUMNS},
      ]}
      entering={BounceInUp.duration(1000)}
      exiting={BounceOutDown.duration(1000)}>
      <CartItem product={product} style={{}} onPress={onPress} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  productStyle: {
    flex: 1,
    maxWidth: '50%',
  },
});

export default AnimatedCartItem;
