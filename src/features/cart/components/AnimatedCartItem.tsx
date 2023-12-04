import React from 'react';
import {StyleSheet} from 'react-native';
import {Product} from '../../products/types/Product';
import {MARGIN_BETWEEN_COLUMNS} from '../CartScreen';
import CartItem from './CartItem';

export type Props = {
  product: Product;
  onPress: () => void;
  showMargin: boolean;
  wasItemDeleted: boolean;
  wasItemMoved: boolean;
  onAnimationFinished: () => void;
};

const AnimatedCartItem: React.FC<Props> = ({
  onPress,
  showMargin,
  product,
  wasItemDeleted,
  wasItemMoved,
  onAnimationFinished,
}) => {
  //   useEffect(() => {
  //     if (wasItemDeleted) {
  //       translateY.value = withTiming(-150, {duration: 500}, () => {});
  //     }
  //   }, [translateY, wasItemDeleted]);

  //   useEffect(() => {
  //     if (wasItemMoved) {
  //       translateY.value = withTiming(-150, {duration: 500});
  //     }
  //   }, [wasItemMoved, translateY]);

  console.log('product name: ', product.name);
  console.log('moved: ', wasItemMoved);
  console.log('deleted: ', wasItemDeleted);
  console.log('-------');

  return (
    // <Animated.View
    //   key={product.id}
    //   //   entering={BounceInUp.duration(1000)}
    //   layout={Layout.springify().delay(100)}
    //   //   exiting={BounceOutDown.duration(1000)}>
    // >
    <CartItem
      product={product}
      style={
        showMargin
          ? {marginEnd: MARGIN_BETWEEN_COLUMNS, ...styles.productStyle}
          : styles.productStyle
      }
      onPress={onPress}
    />
    // </Animated.View>
  );
};

const styles = StyleSheet.create({
  productStyle: {
    maxWidth: 180,
  },
});

export default AnimatedCartItem;
