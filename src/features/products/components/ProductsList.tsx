import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  decrementQuantity,
  incrementQuantity,
} from '../../../infrastructure/store/cartSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../infrastructure/store/hooks/hooks';
import {colors} from '../../shared/colors';
import {useProducts} from '../queries';
import HeaderListItem from './HeaderListItem';
import ProductListItem from './ProductListItem';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  checkoutImageUrl: string;
  listImageUrl: string;
  quantity: number;
}

interface Section {
  title: string;
  data: Product[];
}

export const ProductsList = ({query}: {query: string}) => {
  const {data: apiAproducts} = useProducts();
  const {cart, error, loading} = useAppSelector(state => state.cart);

  const displayList = useMemo(() => {
    return apiAproducts
      ? sortAndGroupProductsByCategory(
          apiAproducts
            ?.filter(product => {
              return query.length !== 0
                ? product.category.includes(query) ||
                    product.name.includes(query)
                : true;
            })
            .map(product => {
              const cartItem = cart.find(it => it.id === product.id);
              return {
                ...product,
                quantity: cartItem ? cartItem.quantity : 0,
              };
            }),
        )
      : [];
  }, [apiAproducts, cart, query]);

  const dispatch = useAppDispatch();

  const onAddProduct = (product: Product) => {
    dispatch(incrementQuantity(product.id));
  };

  const onRemoveProduct = (product: Product) => {
    dispatch(decrementQuantity(product.id));
  };

  if (loading) {
    return <ActivityIndicator size={'large'} />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

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

const productsSeparator = () => {
  return (
    <View style={{height: 1, width: '90%', backgroundColor: colors.gray}} />
  );
};

function sortAndGroupProductsByCategory(products: Product[]): Section[] {
  const sortedProducts = products.sort((a, b) =>
    a.category.localeCompare(b.category),
  );

  const sections: Section[] = [];
  let currentCategory = '';

  for (const product of sortedProducts) {
    if (currentCategory !== product.category) {
      currentCategory = product.category;
      sections.push({title: currentCategory, data: [product]});
    } else {
      sections
        .find(section => section.title === currentCategory)
        ?.data.push(product);
    }
  }

  return sections;
}

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
