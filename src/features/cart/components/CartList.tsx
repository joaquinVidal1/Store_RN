import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {StyleProps} from 'react-native-reanimated';
import {useAppSelector} from '../../../infrastructure/store/hooks/hooks';
import {useProducts} from '../../products/queries';
import {Product} from '../../products/types/Product';
import {MARGIN_HORIZONTAL} from '../CartScreen';
import AnimatedCartItem from './AnimatedCartItem';

const RowsSeparator = () => {
  return <View style={{height: 20}} />;
};

const CartList = ({
  style,
  onProductPressed,
}: {
  style: StyleProps;
  onProductPressed: (product: Product) => void;
}) => {
  const {data: apiProducts} = useProducts();
  const cart = useAppSelector(state => state.cart.cart);

  const displayList: Product[] = useMemo(() => {
    return cart
      .map(cartItem => {
        const product = apiProducts?.find(
          apiProduct => apiProduct.id === cartItem.id,
        );
        return product ? {...product, quantity: cartItem.quantity} : undefined;
      })
      .filter(product => product) as Product[];
  }, [apiProducts, cart]);

  return (
    <Animated.FlatList
      data={displayList}
      contentContainerStyle={styles.contentContainer}
      renderItem={({item, index}) => (
        <AnimatedCartItem
          product={item}
          onPress={() => {
            onProductPressed(item);
          }}
          showMargin={index % 2 === 0}
          index={index}
        />
      )}
      keyExtractor={product => product.id.toString()}
      numColumns={2}
      style={[styles.list, style]}
      ItemSeparatorComponent={RowsSeparator}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 24,
    marginHorizontal: MARGIN_HORIZONTAL,
  },
  list: {},
});

export default CartList;
