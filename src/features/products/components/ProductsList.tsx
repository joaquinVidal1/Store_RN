import React from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {
  decrementQuantity,
  incrementQuantity,
} from '../../../infrastructure/store/cartSlice';
import {useAppDispatch} from '../../../infrastructure/store/hooks/hooks';
import {colors} from '../../shared/colors';
import {productsSeparator} from '../../shared/components/ProductsSeparator';
import {useDisplayList} from '../hooks/useDisplayList';
import {Product} from '../types/Product';
import HeaderListItem from './HeaderListItem';
import ProductListItem from './ProductListItem';

export const ProductsList = ({query}: {query: string}) => {
  const dispatch = useAppDispatch();
  const displayList = useDisplayList(query);

  const onAddProduct = (product: Product) => {
    dispatch(incrementQuantity(product.id));
  };

  const onRemoveProduct = (product: Product) => {
    dispatch(decrementQuantity(product.id));
  };

  return (
    <View style={styles.container}>
      <SectionList
        stickySectionHeadersEnabled={false}
        style={styles.flatList}
        sections={displayList}
        ItemSeparatorComponent={productsSeparator}
        keyExtractor={(item, index) =>
          typeof item === 'string' ? `category-${index}` : item.id.toString()
        }
        renderItem={item => (
          <ProductListItem
            product={item.item}
            onAddProduct={onAddProduct}
            onRemoveProduct={onRemoveProduct}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <HeaderListItem header={title} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
  },
  flatList: {
    backgroundColor: colors.backgroundColor,
  },
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
