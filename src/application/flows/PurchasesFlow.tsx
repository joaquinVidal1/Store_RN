import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import PurchasesScreen from '../../features/purchases/PurchasesScreen';
import {colors} from '../../features/shared/colors';

type PurchasesParamList = {
  Purchases: undefined;
};

const PurchasesNavigator = createNativeStackNavigator<PurchasesParamList>();

const PurchasesFlow = () => {
  return (
    <PurchasesNavigator.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.backgroundColor},
      }}>
      <PurchasesNavigator.Screen name="Purchases" component={PurchasesScreen} />
    </PurchasesNavigator.Navigator>
  );
};

export default PurchasesFlow;
