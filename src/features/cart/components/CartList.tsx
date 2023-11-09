import React, {useMemo} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {useAppSelector} from '../../../infrastructure/store/hooks/hooks';
import {Product} from '../../products/components/ProductsList';
import {useProducts} from '../../products/queries';
import {colors} from '../../shared/colors';

const CartList = () => {
  const {data: apiProducts} = useProducts();
  const {cart, error, loading} = useAppSelector(state => state.cart);
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
    <FlatList
      data={displayList}
      renderItem={item => <Text>{item.item.name}</Text>}
      keyExtractor={product => product.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default CartList;
