import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import ArrowBack from '../../../res/arrow_back.svg';
import MenuIcon from '../../../res/menu_black_24dp.svg';
import CartScreen, {MARGIN_HORIZONTAL} from '../../features/cart/CartScreen';
import CartButton from '../../features/products/components/CartButton';
import ProductsScreen from '../../features/products/ProductsScreen';
import {colors} from '../../features/shared/colors';
import {useAppSelector} from '../../infrastructure/store/hooks/hooks';

export type AppStackParamList = {
  Products: undefined;
  Cart: undefined;
};

const StoreNavigator = createNativeStackNavigator<AppStackParamList>();

export const StoreFlow = () => (
  <StoreNavigator.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: {backgroundColor: colors.backgroundColor},
    }}>
    <StoreNavigator.Screen name="Products" component={ProductsScreen} />
    <StoreNavigator.Screen name="Cart" component={CartScreen} />
  </StoreNavigator.Navigator>
);

export const StoreFlowNavigationOptions = ({navigation}) => {
  const state = navigation.getState();
  const isCartEmpty = useAppSelector(state => state.cart.cart.length === 0);

  const stackState = state.routes.find(route => route.state)?.state;
  const currentScreen = stackState?.routes[stackState?.index]?.name;
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

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: MARGIN_HORIZONTAL,
  },
});
