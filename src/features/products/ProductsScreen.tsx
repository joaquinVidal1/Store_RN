import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Product} from '../../infrastructure/api';
import {ProductsList} from './components/ProductsList';

const ProductsScreen = () => {
  return (
    <View>
      <SafeAreaView>
        <View>
          <ProductsList />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductsScreen;
