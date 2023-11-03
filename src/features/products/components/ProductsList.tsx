import React, {useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Product} from '../../../infrastructure/api';
import {colors} from '../../shared/colors';
import {useProducts} from '../queries';
import HeaderListItem from './HeaderListItem';
import ProductListItem from './ProductListItem';

export const ProductsList = () => {
  const {data, isLoading} = useProducts();
  const displayList = data ? sortAndGroupProductsByCategory(data) : [];

  if (isLoading) {
    return <ActivityIndicator size={'large'} />;
  }

  return (
    <View>
      <FlatList
        style={styles.flatList}
        data={displayList}
        ItemSeparatorComponent={productsSeparator}
        keyExtractor={(item, index) =>
          typeof item === 'string' ? `category-${index}` : item.id.toString()
        }
        renderItem={item => {
          console.log(`${typeof item.item}`);
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
    flexGrow: 1,
    backgroundColor: colors.backgroundColor,
  },
});
