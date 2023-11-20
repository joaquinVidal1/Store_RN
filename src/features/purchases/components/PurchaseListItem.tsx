import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {MARGIN_BETWEEN_COLUMNS, MARGIN_HORIZONTAL} from '../../cart/CartScreen';
import CartItem from '../../cart/components/CartItem';
import {colors} from '../../shared/colors';
import {Purchase} from '../types/Purchase';

export const PurchaseListItem = ({purchase}: {purchase: Purchase}) => {
  const newLocal = 'stretch';
  return (
    <View>
      <FlatList
        horizontal={true}
        data={purchase.items.map(purchaseItem => {
          return {...purchaseItem.product, quantity: purchaseItem.quantity};
        })}
        contentContainerStyle={{
          paddingTop: 24,
          alignItems: newLocal,
          marginHorizontal: MARGIN_HORIZONTAL,
        }}
        renderItem={({item, index}) => (
          <CartItem
            product={item}
            style={
              index !== purchase.items.length - 1
                ? {marginEnd: MARGIN_BETWEEN_COLUMNS}
                : {}
            }
            onPress={() => {}}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.purple,
    marginBottom: 16,
    borderWidth: 2,
  },
});
