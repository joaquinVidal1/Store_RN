import {useQuery} from '@tanstack/react-query';
import {getBanners, getProducts} from '../../infrastructure/api';

const productsKeys = {
  all: ['products'],
};

const bannersKeys = {
  all: ['banners'],
};

export const useProducts = () => {
  return useQuery({
    queryKey: productsKeys.all,
    queryFn: getProducts,
  });
};

export const useBanners = () => {
  return useQuery({
    queryKey: bannersKeys.all,
    queryFn: getBanners,
  });
};
