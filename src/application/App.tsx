import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ArrowBack from '../../res/arrow_back.svg';
import MenuIcon from '../../res/menu_black_24dp.svg';
import {MARGIN_HORIZONTAL} from '../features/cart/CartScreen';
import CartButton from '../features/products/components/CartButton';
import {colors} from '../features/shared/colors';
import {QueryProvider} from '../infrastructure/query';
import {useAppSelector} from '../infrastructure/store/hooks/hooks';
import store, {persistor} from '../infrastructure/store/store';
import PurchasesFlow from './flows/PurchasesFlow';
import StoreFlow from './flows/StoreFlow';

export type AppStackParamList = {
  Products: undefined;
  Cart: undefined;
};

const AppNavigator = createDrawerNavigator();

export type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

const StoreFlowNavigationOptions = ({navigation}) => {
  const state = navigation.getState();
  const isCartEmpty = useAppSelector(state => state.cart.cart.length === 0);

  const stackState = state.routes.find(route => route.state)?.state;
  const currentScreen = stackState?.routes[stackState?.index]?.name;
  console.log('currentScreen: ', currentScreen);
  const isCartScreen = currentScreen === 'Cart';
  return {
    headerRight: () =>
      !isCartScreen && (
        <CartButton
          onPress={() => navigation.navigate('Cart')}
          isEnabled={isCartEmpty}
        />
      ),
    headerLeft: () =>
      isCartScreen ? (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowBack />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <MenuIcon color={colors.primaryColor} />
        </TouchableOpacity>
      ),
  };
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : colors.backgroundColor,
  };

  return (
    <AppNavigator.Navigator
      screenOptions={{sceneContainerStyle: backgroundStyle}}>
      <AppNavigator.Screen
        name="StoreFlow"
        component={StoreFlow}
        options={StoreFlowNavigationOptions}
      />
      <AppNavigator.Screen name="PurchasesFlow" component={PurchasesFlow} />
    </AppNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: MARGIN_HORIZONTAL,
  },
});

export default () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
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
