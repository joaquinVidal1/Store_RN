import {useQuery} from '@tanstack/react-query';
import {getProducts} from '../../infrastructure/api';

const productsKeys = {
  all: ['products'],
};

export const useProducts = () => {
  return useQuery({
    queryKey: productsKeys.all,
    queryFn: getProducts,
  });
};
