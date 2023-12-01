import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CartScreen from '../../features/cart/CartScreen';
import ProductsScreen from '../../features/products/ProductsScreen';
import {colors} from '../../features/shared/colors';

export type AppStackParamList = {
  Products: undefined;
  Cart: undefined;
};

const StoreNavigator = createNativeStackNavigator<AppStackParamList>();

const StoreFlow = () => (
  <StoreNavigator.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: {backgroundColor: colors.backgroundColor},
    }}>
    <StoreNavigator.Screen name="Products" component={ProductsScreen} />
    <StoreNavigator.Screen name="Cart" component={CartScreen} />
  </StoreNavigator.Navigator>
);

export default StoreFlow;
