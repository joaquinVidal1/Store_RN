import {useQuery} from '@tanstack/react-query';
import {getPurchases} from '../../infrastructure/api';
import {Purchase} from './types/Purchase';

export const purchasesKeys = ['all'];

export const usePurchases = () => {
  return useQuery({
    queryKey: purchasesKeys,
    queryFn: getPurchases,
    select: data => {
      const datesPurchasesMap = data.reduce((acc, purchase) => {
        const date = purchase.date.split('T')[0];
        const group = acc.get(date) || [];
        group.push(purchase);
        acc.set(date, group);
        return acc;
      }, new Map<string, Purchase[]>());

      return Array.from(datesPurchasesMap, ([date, purchases]) => ({
        title: date,
        data: purchases,
      })).reverse();
    },
  });
};
