import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp} from '../../application/App';

const PurchaseScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={{}}>
      <Text>PURCHASES</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default PurchaseScreen;
