import {useQuery} from '@tanstack/react-query';
import {getPurchases} from '../../infrastructure/api';

export const purchasesKeys = ['all'];

export const usePurchases = () => {
  return useQuery({
    queryKey: purchasesKeys,
    queryFn: getPurchases,
  });
};
