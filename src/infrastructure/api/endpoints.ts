import {instance} from './instance';

export interface ApiProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  checkoutImageUrl: string;
  listImageUrl: string;
}

export const getProducts = (): Promise<ApiProduct[]> => {
  return instance
    .get('/products')
    .then(response => {
      console.log('response: ', response);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Error fetching products');
      }
    })
    .catch(error => {
      console.log('entro error');
      console.log(error);
      throw error;
    });
};
