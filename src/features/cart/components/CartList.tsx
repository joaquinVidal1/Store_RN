import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
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
  const cart = useAppSelector(state => state.cart.cart);
  const {width} = useWindowDimensions();
  const [showPrev, setShowPrev] = useState<boolean>(false);

  const [prevList, setPrevList] = useState<Product[]>(cart);

  const explote = useCallback(async () => {
    const deletedItems = prevList.filter(
      prevItem => !cart.some(currentItem => currentItem.id === prevItem.id),
    );

    deletedItems.forEach(async product => {
      const itemIndex = displayList.findIndex(item => item.id === product.id);
      console.log('cart', cart);
      console.log('itemIndex: ', itemIndex);
      console.log('displayList: ', displayList);
      await onExplode(() => setPrevList(displayList), itemIndex);
    });
  }, [cart]);

  useEffect(() => {
    explote();
  }, [explote]);

  const displayList: Product[] = useMemo(() => {
    return showPrev
      ? prevList
        ? prevList
        : []
      : (cart
          .map(cartItem => {
            const product = apiProducts?.find(
              apiProduct => apiProduct.id === cartItem.id,
            );
            return product
              ? {...product, quantity: cartItem.quantity}
              : undefined;
          })
          .filter(product => product) as Product[]);
  }, [apiProducts, cart, prevList, showPrev]);

  const scaleValues = useMemo(
    () => displayList.map(() => new Animated.Value(1)),
    [displayList],
  );

  const onExplode = async (callback: () => void, index: number) => {
    console.log('onExplode for index: ', index);
    Animated.sequence([
      Animated.timing(scaleValues[index], {
        toValue: 1.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValues[index], {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      console.log('onExplodeFinished');
      // callback();
      setShowPrev(false);
      callback();
    });
  };

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
        <Animated.View
          style={{
            transform: [{scale: scaleValues[index] ? scaleValues[index] : 0}],
          }}>
          <CartItem
            product={item}
            style={index % 2 === 0 ? {marginEnd: MARGIN_BETWEEN_COLUMNS} : {}}
            onPress={() => {
              setShowPrev(true);
              onProductPressed(item);
            }}
          />
        </Animated.View>
      )}
      keyExtractor={product => product.id.toString()}
      numColumns={numColumns}
      style={[styles.list, style]}
      ItemSeparatorComponent={RowsSeparator}
    />
  );
};

const styles = StyleSheet.create({
  list: {},
});

export default CartList;
