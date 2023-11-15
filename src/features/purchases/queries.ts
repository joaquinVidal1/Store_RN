import {useQuery} from '@tanstack/react-query';
import {getPurchases} from '../../infrastructure/api';

const purchasesKeys = ['all'];

export const usePurchases = () => {
  return useQuery({
    queryKey: purchasesKeys,
    queryFn: getPurchases,
  });
};
