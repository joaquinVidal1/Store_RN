import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ProductsList} from './components/ProductsList';

const ProductsScreen = () => {
  return (
    <View>
      <SafeAreaView>
        <ProductsList />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductsScreen;
