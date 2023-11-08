import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationProp} from '../../application/App';

const CartScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View>
      <Text>Cart Screen</Text>
      <Button
        title="Go back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default CartScreen;
