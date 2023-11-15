import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp} from '../../application/App';
import {usePurchases} from './queries';

const PurchaseScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {data: purchases} = usePurchases();

  return (
    <SafeAreaView style={{}}>
      <FlatList
        data={purchases}
        renderItem={({item, index}) => <Text>{item.date}</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default PurchaseScreen;
