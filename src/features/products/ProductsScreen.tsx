import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import EnabledShoppingCart from '../../../res/shopping-cart-enabled.svg';
import ShoppingCart from '../../../res/shopping-cart.svg';
import {useAppSelector} from '../../infrastructure/store/hooks/hooks';
import Carrousel from './components/Carrousel';
import {ProductsList} from './components/ProductsList';
import SearchBar from './components/SearchBar';

const ProductsScreen = () => {
  const isEmpty = useAppSelector(state => state.cart.cart.length === 0);
  const [query, setQuery] = useState('');

  const cartImage = isEmpty ? (
    <ShoppingCart />
  ) : (
    <TouchableOpacity>
      <EnabledShoppingCart />
    </TouchableOpacity>
  );

  return (
    <View>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.cartButton}>{cartImage}</View>
          <Carrousel />
          <SearchBar
            style={styles.searchBar}
            query={query}
            onQueryChanged={newQuery => {
              setQuery(newQuery);
            }}
          />
          <ProductsList query={query} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  carrousel: {
    width: '100%',
    height: 250,
  },
  cartButton: {
    marginEnd: 29,
    marginVertical: 16,
    alignSelf: 'flex-end',
  },
  searchBar: {
    marginTop: 24,
  },
});

export default ProductsScreen;
