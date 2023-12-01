import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Text, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {colors} from '../features/shared/colors';
import {QueryProvider} from '../infrastructure/query';
import store, {persistor} from '../infrastructure/store/store';
import PurchasesFlow from './flows/PurchasesFlow';
import {StoreFlow, StoreFlowNavigationOptions} from './flows/StoreFlow';

export type AppStackParamList = {
  Products: undefined;
  Cart: undefined;
};

const AppNavigator = createDrawerNavigator();

export type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

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
