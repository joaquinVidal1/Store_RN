import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {QueryProvider} from '../infrastructure/query';
import CartScreen from '../features/cart/CartScreen';
import ProductsScreen from '../features/products/ProductsScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const appNavigator = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <appNavigator.Navigator screenOptions={{headerShown: false}}>
        <appNavigator.Screen name="Products" component={ProductsScreen} />
        <appNavigator.Screen name="Cart" component={CartScreen} />
      </appNavigator.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <QueryProvider>
      <App />
    </QueryProvider>
  );
};
