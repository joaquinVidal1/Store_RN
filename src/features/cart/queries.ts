import {useMutation, useQueryClient} from '@tanstack/react-query';
import {makeCheckout} from '../../infrastructure/api';
import {purchasesKeys} from '../purchases/queries';

export const useCheckoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: makeCheckout,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: purchasesKeys});
    },
  });
};
