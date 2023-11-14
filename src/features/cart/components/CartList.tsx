import React, {useMemo} from 'react';
import {FlatList, StyleSheet, useWindowDimensions, View} from 'react-native';
import {StyleProps} from 'react-native-reanimated';
import {useAppSelector} from '../../../infrastructure/store/hooks/hooks';
import {Product} from '../../products/components/ProductsList';
import {useProducts} from '../../products/queries';
import {
  IMAGE_SIZE,
  MARGIN_BETWEEN_COLUMNS,
  MARGIN_HORIZONTAL,
} from '../CartScreen';
import CartItem from './CartItem';

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
  const {width} = useWindowDimensions();

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

  const numColumns = Math.floor(
    (width - 2 * MARGIN_HORIZONTAL - MARGIN_BETWEEN_COLUMNS) / IMAGE_SIZE,
  );

  return (
    <FlatList
      data={displayList}
      contentContainerStyle={{
        paddingTop: 24,
        alignItems: 'stretch',
        marginHorizontal: MARGIN_HORIZONTAL,
      }}
      renderItem={({item, index}) => (
        <CartItem
          product={item}
          style={index % 2 === 0 ? {marginEnd: MARGIN_BETWEEN_COLUMNS} : {}}
          onPress={() => onProductPressed(item)}
        />
      )}
      keyExtractor={product => product.id.toString()}
      numColumns={numColumns}
      style={[styles.list, style]}
      ItemSeparatorComponent={RowsSeparator}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
});

export default CartList;
