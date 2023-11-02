import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Product} from '../../../infrastructure/api';
import {useProducts} from '../queries';
import ProductListItem from './ProductListItem';

export const ProductsList = () => {
  const {data, error, isLoading} = useProducts();

  console.log('data in screen: ', data);

  if (isLoading) {
    return <ActivityIndicator size={'large'} />;
  }

  return (
    <FlatList
      style={styles.flatList}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={item => {
        return ProductListItem(item.item);
      }}
    />
  );
};

const keyExtractor = (product: Product) => `${product.id}`;

const styles = StyleSheet.create({
  postContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'green',
  },
  flatList: {
    flexGrow: 1,
    backgroundColor: 'black',
  },
});
