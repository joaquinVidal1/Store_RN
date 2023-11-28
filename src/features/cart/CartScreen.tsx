import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {NavigationProp} from '../../application/App';
import {cleanCart, editQuantity} from '../../infrastructure/store/cartSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../infrastructure/store/hooks/hooks';
import {useProducts} from '../products/queries';
import {Product} from '../products/types/Product';
import {colors} from '../shared/colors';
import ProductBottomSheet from './components/BottomSheet';
import CartList from './components/CartList';
import ConfirmationButton from './components/ConfirmationButton';
import EdditingDialog from './components/EdditingDialog';
import {useCheckoutMutation} from './queries';

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
  const {mutate} = useCheckoutMutation();
  const [showPrev, setShowPrev] = useState<boolean>(false);

  useEffect(() => {
    if (edittingProduct) {
      bottomSheetModalRef.current?.present();
      setShowPrev(true);
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [edittingProduct]);

  const showModal = useMemo(() => {
    return edittingProduct !== undefined;
  }, [edittingProduct]);

  const dispatch = useAppDispatch();

  const bottomSheetModalRef: React.RefObject<BottomSheetModal> =
    useRef<BottomSheetModal>(null);

  const onConfirmEdittion = (productId: number, quantity: number) => {
    dispatch(
      editQuantity({
        prodctId: productId,
        newQuantity: quantity,
      }),
    );
    setEdittingProduct(undefined);
  };

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
    <SafeAreaView>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <Text style={styles.title}>Shopping Cart</Text>
          <CartList
            style={styles.cartList}
            onProductPressed={product => setEdittingProduct(product)}
            showPrev={showPrev}
            setShowPrev={setShowPrev}
          />
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
          {edittingProduct ? (
            Platform.OS === 'ios' ? (
              <ProductBottomSheet
                product={edittingProduct}
                reference={bottomSheetModalRef}
                onDismiss={() => setEdittingProduct(undefined)}
                onConfirmEdittion={quantity => {
                  onConfirmEdittion(edittingProduct.id, quantity);
                }}
              />
            ) : (
              <EdditingDialog
                product={edittingProduct}
                onConfirmEdittion={quantity => {
                  onConfirmEdittion(edittingProduct.id, quantity);
                }}
                showModal={showModal}
                onDismiss={() => setEdittingProduct(undefined)}
              />
            )
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
