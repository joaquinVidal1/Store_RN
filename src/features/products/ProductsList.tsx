import React from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {Product} from '../../infrastructure/api';
import {useProducts} from './queries';

export const ProductsList = () => {
  const {data, error, isLoading} = useProducts();

  console.log('data in screen: ', data);

  // if (isLoading) {
  //   return <ActivityIndicator size={'large'} />;
  // }

  return (
    <FlatList
      style={styles.flatList}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={item => {
        return renderItem(item.item);
      }}
    />
  );
};

const keyExtractor = (product: Product) => `${product.id}`;

const renderItem = (item: Product) => {
  console.log('in render item');
  return (
    <View style={styles.postContainer}>
      <Text>{item.name}</Text>
    </View>
  );
};

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
