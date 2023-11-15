import {createDrawerNavigator} from '@react-navigation/drawer';
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
import PurchasesScreen from '../features/purchases/PurchasesScreen';
import {colors} from '../features/shared/colors';
import {QueryProvider} from '../infrastructure/query';
import store, {persistor} from '../infrastructure/store/store';

type AppStackParamList = {
  Products: undefined;
  Cart: undefined;
};

type PurchasesParamList = {
  Purchases: undefined;
};

const StoreNavigator = createNativeStackNavigator<AppStackParamList>();
const PurchasesNavigator = createNativeStackNavigator<PurchasesParamList>();
const AppNavigator = createDrawerNavigator();

const StoreFlow = () => {
  return (
    <StoreNavigator.Navigator screenOptions={{headerShown: false}}>
      <StoreNavigator.Screen name="Products" component={ProductsScreen} />
      <StoreNavigator.Screen name="Cart" component={CartScreen} />
    </StoreNavigator.Navigator>
  );
};

const PurchasesFlow = () => {
  return (
    <PurchasesNavigator.Navigator screenOptions={{headerShown: false}}>
      <PurchasesNavigator.Screen name="Purchases" component={PurchasesScreen} />
    </PurchasesNavigator.Navigator>
  );
};

export type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : colors.backgroundColor,
  };

  return (
    <NavigationContainer>
      <AppNavigator.Navigator
        screenOptions={{sceneContainerStyle: backgroundStyle}}>
        <AppNavigator.Screen name="Store" component={StoreFlow} />
        <AppNavigator.Screen name="Purchases" component={PurchasesFlow} />
      </AppNavigator.Navigator>
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
