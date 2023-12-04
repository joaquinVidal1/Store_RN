import React, {useCallback, useMemo, useState} from 'react';
import {
  // Animated,
  Dimensions,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {LinearTransition, StyleProps} from 'react-native-reanimated';
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

function arraysEqual(a, b) {
  a = Array.isArray(a) ? a : [];
  b = Array.isArray(b) ? b : [];
  return a.length === b.length && a.every((el, ix) => el === b[ix]);
}

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
  const [prevList, setPrevList] = useState<Product[]>([]);

  // const explote = useCallback(async () => {
  //   const deletedItems = prevList.filter(
  //     prevItem => !cart.some(currentItem => currentItem.id === prevItem.id),
  //   );

  //   const promises = deletedItems.map(async product => {
  //     const itemIndex = displayList.findIndex(item => item.id === product.id);
  //     console.log('cart', cart);
  //     console.log('itemIndex: ', itemIndex);
  //     console.log('displayList: ', displayList);
  //     await onExplode(itemIndex);
  //   });

  //   if (promises && promises.length > 0) {
  //     Promise.all(promises).then(() => setShowPrev(false));
  //     setPrevList(displayList);
  //   } else {
  //     setShowPrev(false);
  //     setPrevList(displayList);
  //   }
  // }, [cart]);

  // useEffect(() => {
  //   explote();
  // }, [explote]);

  const updatePrevList = useCallback(
    async (displayList: Product[]) => {
      const sleep = (ms: number) => {
        return new Promise(resolve => {
          setTimeout(resolve, ms);
        });
      };

      await sleep(1000);

      setPrevList(displayList);
      setShowPrev(false);
    },
    [setPrevList, setShowPrev],
  );

  const displayList2: Product[] = useMemo(() => {
    return cart
      .map(cartItem => {
        const product = apiProducts?.find(
          apiProduct => apiProduct.id === cartItem.id,
        );
        return product ? {...product, quantity: cartItem.quantity} : undefined;
      })
      .filter(product => product) as Product[];
  }, [apiProducts, cart]);

  const displayList: Product[] = useMemo(() => {
    if (showPrev) {
      // if (
      //   JSON.stringify(prevList) !== JSON.stringify(displayList) &&
      //   displayList
      // ) {
      //   console.log('prevList: ', JSON.stringify(prevList));
      //   console.log('displayList: ', JSON.stringify(displayList));
      //   updatePrevList(displayList);
      // }
      return prevList ? prevList : [];
    } else {
      return cart
        .map(cartItem => {
          const product = apiProducts?.find(
            apiProduct => apiProduct.id === cartItem.id,
          );
          return product
            ? {...product, quantity: cartItem.quantity}
            : undefined;
        })
        .filter(product => product) as Product[];
    }
  }, [apiProducts, cart, prevList, showPrev]);

  // const displayList: Product[] = useMemo(() => {
  //   return cart
  //     .map(cartItem => {
  //       const product = apiProducts?.find(
  //         apiProduct => apiProduct.id === cartItem.id,
  //       );
  //       return product ? {...product, quantity: cartItem.quantity} : undefined;
  //     })
  //     .filter(product => product) as Product[];
  // }, [apiProducts, cart]);

  // const scaleValues = useMemo(
  //   () => displayList.map(() => new Animated.Value(1)),
  //   [displayList],
  // );

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

  const renderCell = useCallback(props => {
    return (
      <Animated.View
        {...props}
        layout={LinearTransition.duration(3000)}
        // entering={BounceInUp.duration(1000)}
        // exiting={BounceOutDown.duration(1000)}
      />
    );
  }, []);

  return (
    <Animated.FlatList
      data={displayList2}
      contentContainerStyle={{
        paddingTop: 24,
        marginHorizontal: MARGIN_HORIZONTAL,
        alignItems: 'stretch',
      }}
      renderItem={({item, index}) => (
        <AnimatedCartItem
          product={item}
          onPress={() => {
            // setPrevList(displayList);
            onProductPressed(item);
          }}
          showMargin={index % 2 === 0}
          wasItemDeleted={
            prevList
              ? prevList
                  .filter(
                    prevItem =>
                      !cart.some(currentItem => currentItem.id === prevItem.id),
                  )
                  .find(prevItem => prevItem.id === item.id) !== undefined
              : false
          }
          wasItemMoved={
            prevList
              ? prevList.findIndex(product => product.id === item.id) !==
                  cart.findIndex(product => product.id === item.id) &&
                cart.findIndex(product => product.id === item.id) !== -1
              : false
          }
          onAnimationFinished={() => {
            setShowPrev(false);
            setPrevList(displayList);
          }}
        />
      )}
      keyExtractor={product => product.id.toString()}
      numColumns={numColumns}
      style={[styles.list, style]}
      ItemSeparatorComponent={RowsSeparator}
      CellRendererComponent={renderCell}
      // layout={LinearTransition.duration(3000)}
    />
  );
};

const styles = StyleSheet.create({
  list: {},
});

export default CartList;
