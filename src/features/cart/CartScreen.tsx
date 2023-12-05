import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {setEdditingProduct} from '../../infrastructure/store/editingProductSlice';
import {useAppDispatch} from '../../infrastructure/store/hooks/hooks';
import BottomSheet from '../BottomSheet/BottomSheet';
import {colors} from '../shared/colors';
import CartList from './components/CartList';
import CartScreenFooter from './components/CartScreenFooter';

export const MARGIN_HORIZONTAL = 18;
export const MARGIN_BETWEEN_COLUMNS = 12;
export const IMAGE_SIZE = 150;

const CartScreen = () => {
  const dispatch = useAppDispatch();

  console.log('------------------');
  console.log('screen rendering');

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Shopping Cart</Text>
        <CartList
          style={styles.cartList}
          onProductPressed={product => dispatch(setEdditingProduct(product))}
        />
        <CartScreenFooter />
      </View>
      <BottomSheet />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginHorizontal: MARGIN_HORIZONTAL,
    color: colors.primaryColor,
    marginTop: 16,
  },
  cartList: {
    flex: 1,
  },
});

export default CartScreen;
