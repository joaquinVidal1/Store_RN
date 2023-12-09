import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {MARGIN_BETWEEN_COLUMNS, MARGIN_HORIZONTAL} from '../../cart/CartScreen';
import CartItem from '../../cart/components/CartItem';
import {colors} from '../../shared/colors';
import {Purchase} from '../types/Purchase';

export const PurchaseListItem = ({purchase}: {purchase: Purchase}) => {
  return (
    <View>
      <FlatList
        horizontal={true}
        data={purchase.items.map(purchaseItem => {
          return {...purchaseItem.product, quantity: purchaseItem.quantity};
        })}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item, index}) => (
          <CartItem
            product={item}
            style={
              index !== purchase.items.length - 1
                ? {marginEnd: MARGIN_BETWEEN_COLUMNS, maxWidth: 150}
                : {maxWidth: 150}
            }
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
  contentContainer: {
    paddingTop: 24,
    alignItems: 'stretch',
    marginHorizontal: MARGIN_HORIZONTAL,
  },
});
