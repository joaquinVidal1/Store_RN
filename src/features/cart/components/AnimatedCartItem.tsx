import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  BounceInUp,
  BounceOutDown,
  useAnimatedStyle,
  useSharedValue,
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
  wasItemMoved: boolean;
};

const AnimatedCartItem: React.FC<Props> = ({
  onPress,
  showMargin,
  product,
  wasItemDeleted,
  wasItemMoved,
}) => {
  const translateY = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  }, []);

  useEffect(() => {
    if (wasItemDeleted) {
      translateY.value = withTiming(-150, {duration: 500}, () => {});
    }
  }, [translateY, wasItemDeleted]);

  useEffect(() => {
    if (wasItemMoved) {
      translateY.value = withTiming(-150, {duration: 500});
    }
  }, [wasItemMoved, translateY]);

  return (
    <Animated.View
      entering={wasItemMoved ? undefined : BounceInUp}
      exiting={wasItemDeleted ? BounceOutDown : undefined}
      style={[animatedStyle]}>
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
