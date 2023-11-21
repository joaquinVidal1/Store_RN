import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {Text, TouchableOpacity, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ArrowBack from '../../res/arrow_back.svg';
import MenuIcon from '../../res/menu_black_24dp.svg';
import CartScreen from '../features/cart/CartScreen';
import CartButton from '../features/products/components/CartButton';
import ProductsScreen from '../features/products/ProductsScreen';
import PurchasesScreen from '../features/purchases/PurchasesScreen';
import {colors} from '../features/shared/colors';
import {QueryProvider} from '../infrastructure/query';
import {useAppSelector} from '../infrastructure/store/hooks/hooks';
import store, {persistor} from '../infrastructure/store/store';
import {navigationRef} from './RootNavigation';

export type AppStackParamList = {
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
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : colors.backgroundColor,
  };
  return (
    <StoreNavigator.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: backgroundStyle,
      }}>
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

  const isCartEmpty = useAppSelector(state => state.cart.cart.length === 0);

  return (
    <AppNavigator.Navigator
      screenOptions={{sceneContainerStyle: backgroundStyle}}>
      <AppNavigator.Screen
        name="StoreFlow"
        component={StoreFlow}
        options={({navigation}) => {
          const state = navigation.getState();

          // Encuentra el estado del StackNavigator anidado
          const stackState = state.routes.find(route => route.state)?.state;
          const currentScreen = stackState?.routes[stackState?.index]?.name;

          const isCartScreen = currentScreen === 'Cart';

          return {
            headerRight: () => (
              <CartButton
                onPress={() => navigation.navigate('Cart')}
                isEnabled={isCartEmpty}
              />
            ),
            headerLeft: () =>
              isCartScreen ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <ArrowBack />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    navigation.openDrawer();
                  }}>
                  <MenuIcon color={colors.primaryColor} />
                </TouchableOpacity>
              ),
          };
        }}
      />
      <AppNavigator.Screen name="PurchasesFlow" component={PurchasesFlow} />
    </AppNavigator.Navigator>
  );
}

export default () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <QueryProvider>
          <Provider store={store}>
            <PersistGate
              loading={<Text>Loading...</Text>}
              persistor={persistor}>
              <SafeAreaProvider>
                <App />
              </SafeAreaProvider>
            </PersistGate>
          </Provider>
        </QueryProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
