import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowBack from '../../../res/arrow_back.svg';
import {NavigationProp} from '../../application/App';
import {editQuantity} from '../../infrastructure/store/cartSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../infrastructure/store/hooks/hooks';
import {Product} from '../products/components/ProductsList';
import {useProducts} from '../products/queries';
import {colors} from '../shared/colors';
import ProductBottomSheet from './components/BottomSheet';
import CartList from './components/CartList';
import ConfirmationButton from './components/ConfirmationButton';

export const MARGIN_HORIZONTAL = 18;
export const MARGIN_BETWEEN_COLUMNS = 12;
export const IMAGE_SIZE = 150;

const CartScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const cart = useAppSelector(state => state.cart.cart);
  const {data: products} = useProducts();
  const [edittingProduct, setEdittingProduct] = useState<Product | undefined>(
    undefined,
  );

  useEffect(() => {
    edittingProduct
      ? bottomSheetModalRef.current?.present()
      : bottomSheetModalRef.current?.close();
  }, [edittingProduct]);

  const dispatch = useAppDispatch();

  const bottomSheetModalRef: React.RefObject<BottomSheetModal> =
    useRef<BottomSheetModal>(null);

  const totalAmount = useMemo(() => {
    return cart
      .reduce((total, cartItem) => {
        const product = products?.find(prod => prod.id === cartItem.id);
        return product ? total + product.price * cartItem.quantity : total;
      }, 0)
      .toFixed(2);
  }, [cart, products]);

  return (
    <SafeAreaView>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.iconBack}
            onPress={() => {
              navigation.goBack();
            }}>
            <ArrowBack />
          </TouchableOpacity>
          <Text style={styles.title}>Shopping Cart</Text>
          <CartList
            style={styles.cartList}
            onProductPressed={product => setEdittingProduct(product)}
          />
          <View style={styles.bottomContainer}>
            <View style={styles.totalAmountContainer}>
              <Text style={styles.total}>Total:</Text>
              <Text style={styles.totalAmount}>{'$' + totalAmount}</Text>
            </View>
            <ConfirmationButton
              onPress={() => {}}
              text="Checkout"
              style={styles.buttonColor}
            />
          </View>
          {edittingProduct ? (
            <ProductBottomSheet
              product={edittingProduct}
              reference={bottomSheetModalRef}
              onConfirmEdittion={quantity => {
                dispatch(
                  editQuantity({
                    prodctId: edittingProduct.id,
                    newQuantity: quantity,
                  }),
                );
                setEdittingProduct(undefined);
              }}
            />
          ) : (
            <></>
          )}
        </View>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: '100%',
  },
  iconBack: {
    marginHorizontal: MARGIN_HORIZONTAL,
    marginTop: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginHorizontal: MARGIN_HORIZONTAL,
    color: colors.primaryColor,
    marginTop: 16,
  },
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

export default CartScreen;
