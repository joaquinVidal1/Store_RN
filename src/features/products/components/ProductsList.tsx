import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useAppSelector} from '../../../infrastructure/store/hooks/hooks';
import {colors} from '../../shared/colors';
import {useProducts} from '../queries';
import HeaderListItem from './HeaderListItem';
import ProductListItem from './ProductListItem';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  checkoutImageUrl: string;
  listImageUrl: string;
  quantity: number;
}

export const ProductsList = ({query}: {query: string}) => {
  const {data: apiAproducts} = useProducts();
  const {cart, error, loading} = useAppSelector(state => state.cart);
  const [displayList, setDisplaList] = useState<(Product | string)[]>([]);

  useEffect(() => {
    if (apiAproducts) {
      setDisplaList(
        sortAndGroupProductsByCategory(
          apiAproducts
            ?.filter(product => {
              return query.length !== 0
                ? product.category.includes(query) ||
                    product.name.includes(query)
                : true;
            })
            .map(product => {
              const cartItem = cart.find(it => it.id === product.id);
              return {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                checkoutImageUrl: product.checkoutImageUrl,
                listImageUrl: product.listImageUrl,
                quantity: cartItem ? cartItem.quantity : 0,
              };
            }),
        ),
      );
    } else {
      setDisplaList([]);
    }
  }, [apiAproducts, cart, query]);

  if (loading) {
    return <ActivityIndicator size={'large'} />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        // bounces={false}
        style={styles.flatList}
        data={displayList}
        ItemSeparatorComponent={productsSeparator}
        keyExtractor={(item, index) =>
          typeof item === 'string' ? `category-${index}` : item.id.toString()
        }
        renderItem={item => {
          return typeof item.item === 'string' ? (
            <HeaderListItem header={item.item} />
          ) : (
            <ProductListItem product={item.item} />
          );
        }}
      />
    </View>
  );
};

const productsSeparator = () => {
  return (
    <View style={{height: 1, width: '90%', backgroundColor: colors.gray}} />
  );
};

function sortAndGroupProductsByCategory(
  products: Product[],
): (Product | string)[] {
  const sortedProducts = products.sort((a, b) =>
    a.category.localeCompare(b.category),
  );

  const groupedProducts = [];
  let currentCategory = '';

  for (const product of sortedProducts) {
    if (currentCategory !== product.category) {
      currentCategory = product.category;
      groupedProducts.push(currentCategory);
    }
    groupedProducts.push(product);
  }

  return groupedProducts;
}

const styles = StyleSheet.create({
  productContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
  },
  flatList: {
    backgroundColor: colors.backgroundColor,
  },
  container: {
    flex: 1,
    // backgroundColor: colors.backgroundColor,
    backgroundColor: 'red',
  },
});
