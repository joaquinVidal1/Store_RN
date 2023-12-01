import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  BounceInUp,
  BounceOutDown,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Product} from '../../products/types/Product';
import {MARGIN_BETWEEN_COLUMNS} from '../CartScreen';
import CartItem from './CartItem';

export type Props = {
  product: Product;
  onPress: () => void;
  showMargin: boolean;
  wasItemDeleted: boolean;
};

const AnimatedCartItem: React.FC<Props> = ({
  onPress,
  showMargin,
  product,
  wasItemDeleted,
}) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: withTiming(yPositions[product.id].value, {duration: 500})},
      ],
    };
  });

  return (
    <Animated.View
      exiting={BounceOutDown}
      entering={BounceInUp}
      style={{
        transform: [{scale: scaleValue}],
        marginEnd: showMargin ? MARGIN_BETWEEN_COLUMNS : 0,
        animatedStyles,
      }}>
      <CartItem
        product={product}
        style={
          showMargin
            ? {marginEnd: MARGIN_BETWEEN_COLUMNS, ...styles.productStyle}
            : styles.productStyle
        }
        onPress={onPress}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  productStyle: {
    maxWidth: 180,
  },
});

export default AnimatedCartItem;
