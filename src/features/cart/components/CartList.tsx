import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {StyleProps} from 'react-native-reanimated';
import {useAppSelector} from '../../../infrastructure/store/hooks/hooks';
import {useProducts} from '../../products/queries';
import {Product} from '../../products/types/Product';
import {
  IMAGE_SIZE,
  MARGIN_BETWEEN_COLUMNS,
  MARGIN_HORIZONTAL,
} from '../CartScreen';
import AnimatedCartItem from './AnimatedCartItem';

const RowsSeparator = () => {
  return <View style={{height: 20}} />;
};

const CartList = ({
  style,
  onProductPressed,
  showPrev,
  setShowPrev,
}: {
  style: StyleProps;
  onProductPressed: (product: Product) => void;
  showPrev: boolean;
  setShowPrev: (arg0: boolean) => void;
}) => {
  const {data: apiProducts} = useProducts();
  const cart = useAppSelector(state => state.cart.cart);
  const {width} = useWindowDimensions();

  const explote = useCallback(async () => {
    const deletedItems = prevList.filter(
      prevItem => !cart.some(currentItem => currentItem.id === prevItem.id),
    );

    const promises = deletedItems.map(async product => {
      const itemIndex = displayList.findIndex(item => item.id === product.id);
      console.log('cart', cart);
      console.log('itemIndex: ', itemIndex);
      console.log('displayList: ', displayList);
      await onExplode(itemIndex);
    });

    if (promises && promises.length > 0) {
      Promise.all(promises).then(() => setShowPrev(false));
      setPrevList(displayList);
    } else {
      setShowPrev(false);
      setPrevList(displayList);
    }
  }, [cart]);

  useEffect(() => {
    explote();
  }, [explote]);

  const [prevList, setPrevList] = useState<Product[]>([]);

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

  const onExplode = async (index: number) => {
    console.log('onExplode for index: ', index);
    return new Promise<void>(resolve =>
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
        resolve();
      }),
    );
  };

  const numColumns = Math.floor(
    (width - 2 * MARGIN_HORIZONTAL - MARGIN_BETWEEN_COLUMNS) / IMAGE_SIZE,
  );
  const maxWidth = Dimensions.get('window').width - 3 * MARGIN_HORIZONTAL;
  return (
    <FlatList
      data={displayList}
      contentContainerStyle={{
        paddingTop: 24,
        marginHorizontal: MARGIN_HORIZONTAL,
        alignItems: 'stretch',
      }}
      renderItem={
        ({item, index}) => (
          <AnimatedCartItem
            product={item}
            onPress={() => {
              setPrevList(displayList);
              onProductPressed(item);
            }}
            showMargin={index % 2 === 0}
            wasItemDeleted={false}
          />
        )
        // (
        //   <Animated.View
        //     style={{
        //       transform: [{scale: scaleValues[index]}],
        //       flex: 1,
        //       marginEnd: index % 2 === 0 ? MARGIN_BETWEEN_COLUMNS : 0,
        //       maxWidth: maxWidth,
        //     }}>
        //     <CartItem
        //       product={item}
        //       style={index % 2 === 0 ? {marginEnd: MARGIN_BETWEEN_COLUMNS} : {}}
        //       onPress={() => {
        //         setPrevList(displayList);
        //         onProductPressed(item);
        //       }}
        //     />
        //   </Animated.View>
        // )}
      }
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
