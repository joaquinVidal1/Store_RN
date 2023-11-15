import {CartProduct} from '../store/cartSlice';
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
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Error fetching products');
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const makeCheckout = (cart: CartProduct[]) => {
  return instance
    .post('/checkout', {
      cart: cart.map(cartItem => {
        return {
          quantity: cartItem.quantity,
          product_id: cartItem.id,
        };
      }),
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export interface Banner {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export const getBanners = (): Promise<Banner[]> => {
  return instance
    .get('/promoted')
    .then(response => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Error fetching products');
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};
