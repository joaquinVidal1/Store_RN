import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carrousel from './components/Carrousel';
import {ProductsList} from './components/ProductsList';

const ProductsScreen = () => {
  return (
    <View>
      <SafeAreaView>
        <View style={styles.container}>
          <Carrousel />
          <ProductsList />
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
});

export default ProductsScreen;
