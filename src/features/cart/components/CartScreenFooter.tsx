import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {NavigationProp} from '../../../application/App';
import {cleanCart} from '../../../infrastructure/store/cartSlice';
import {useAppSelector} from '../../../infrastructure/store/hooks/hooks';
import {useProducts} from '../../products/queries';
import {colors} from '../../shared/colors';
import {MARGIN_HORIZONTAL} from '../CartScreen';
import {useCheckoutMutation} from '../queries';
import ConfirmationButton from './ConfirmationButton';

const CartScreenFooter = () => {
  const cart = useAppSelector(state => state.cart.cart);
  const navigation = useNavigation<NavigationProp>();
  const {data: products} = useProducts();
  const {mutate} = useCheckoutMutation();

  const onConfirmPurchase = () => {
    mutate(cart, {
      onSuccess: () => {
        Toast.show('success', 3);
        dispatch(cleanCart());
        navigation.goBack();
      },
      onError: () => {
        Toast.show('error, please try again', 3);
      },
    });
  };

  const totalAmount = useMemo(() => {
    return cart
      .reduce((total, cartItem) => {
        const product = products?.find(prod => prod.id === cartItem.id);
        return product ? total + product.price * cartItem.quantity : total;
      }, 0)
      .toFixed(2);
  }, [cart, products]);

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.totalAmountContainer}>
        <Text style={styles.total}>Total:</Text>
        <Text style={styles.totalAmount}>{'$' + totalAmount}</Text>
      </View>
      <ConfirmationButton
        onPress={onConfirmPurchase}
        text="Checkout"
        style={styles.buttonColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  totalAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 32,
  },
  bottomContainer: {
    marginHorizontal: MARGIN_HORIZONTAL,
    paddingBottom: 44,
  },
  cartList: {
    flex: 1,
  },
  total: {
    fontSize: 22,
    color: colors.primaryColor,
    alignSelf: 'baseline',
  },
  totalAmount: {
    fontSize: 32,
    color: colors.primaryColor,
    fontWeight: 'bold',
  },
  buttonColor: {
    backgroundColor: '#4C2DE8',
  },
});

export default CartScreenFooter;
function dispatch(arg0: {payload: undefined; type: 'cart/cleanCart'}) {
  throw new Error('Function not implemented.');
}
