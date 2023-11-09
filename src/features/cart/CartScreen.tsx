import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowBack from '../../../res/arrow_back.svg';
import {NavigationProp} from '../../application/App';
import {colors} from '../shared/colors';
import CartList from './components/CartList';

const CartScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconBack}
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowBack />
        </TouchableOpacity>
        <Text style={styles.title}>Shopping Cart</Text>
        <CartList />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
  },
  iconBack: {
    marginTop: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.primaryColor,
    marginTop: 16,
  },
});

export default CartScreen;
