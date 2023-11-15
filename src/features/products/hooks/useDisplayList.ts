import {useMemo} from 'react';
import {useAppSelector} from '../../../infrastructure/store/hooks/hooks';
import {useProducts} from '../queries';
import {Product} from '../types/Product';

interface Section {
  title: string;
  data: Product[];
}

export const useDisplayList = (query: string) => {
  const {data: apiAproducts} = useProducts();
  const {cart} = useAppSelector(state => state.cart);

  return useMemo(() => {
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
