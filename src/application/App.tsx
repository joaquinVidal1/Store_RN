import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {Text, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import CartScreen from '../features/cart/CartScreen';
import ProductsScreen from '../features/products/ProductsScreen';
import {colors} from '../features/shared/colors';
import {QueryProvider} from '../infrastructure/query';
import store, {persistor} from '../infrastructure/store/store';

type AppStackParamList = {
  Products: undefined;
  Cart: undefined;
};

export type NavigationProp = NativeStackNavigationProp<AppStackParamList>;
const appNavigator = createNativeStackNavigator<AppStackParamList>();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : colors.backgroundColor,
  };

  return (
    <NavigationContainer>
      <appNavigator.Navigator
        screenOptions={{headerShown: false, contentStyle: backgroundStyle}}>
        <appNavigator.Screen name="Products" component={ProductsScreen} />
        <appNavigator.Screen name="Cart" component={CartScreen} />
      </appNavigator.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryProvider>
        <Provider store={store}>
          <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
            <SafeAreaProvider>
              <App />
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
};
