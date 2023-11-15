import {useMutation} from '@tanstack/react-query';
import {makeCheckout} from '../../infrastructure/api';

export const useCheckoutMutation = () =>
  useMutation({
    mutationFn: makeCheckout,
  });
