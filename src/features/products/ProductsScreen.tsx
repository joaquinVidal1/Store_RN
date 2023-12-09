import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carrousel from './components/Carrousel';
import {ProductsList} from './components/ProductsList';
import SearchBar from './components/SearchBar';

const ProductsScreen = () => {
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={{flex: 1}}>
      <View style={styles.container}>
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
    marginTop: 12,
  },
  carrousel: {
    width: '100%',
    height: 250,
  },
  searchBar: {
    marginTop: 24,
  },
});

export default ProductsScreen;
