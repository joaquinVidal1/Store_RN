import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import EnabledShoppingCart from '../../../res/shopping-cart-enabled.svg';
import ShoppingCart from '../../../res/shopping-cart.svg';
import {NavigationProp} from '../../application/App';
import {useAppSelector} from '../../infrastructure/store/hooks/hooks';
import Carrousel from './components/Carrousel';
import {ProductsList} from './components/ProductsList';
import SearchBar from './components/SearchBar';

const ProductsScreen = () => {
  const isEmpty = useAppSelector(state => state.cart.cart.length === 0);
  const [query, setQuery] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const cartImage = isEmpty ? (
    <ShoppingCart />
  ) : (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Cart');
      }}>
      <EnabledShoppingCart />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={{flex: 1}}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carrousel: {
    width: '100%',
    height: 250,
  },
  cartButton: {
    marginEnd: 29,
    marginBottom: 16,
    alignSelf: 'flex-end',
  },
  searchBar: {
    marginTop: 24,
  },
});

export default ProductsScreen;
