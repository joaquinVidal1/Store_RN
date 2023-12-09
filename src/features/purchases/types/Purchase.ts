import {ApiProduct} from '../../../infrastructure/api';

export interface Purchase {
  date: string;
  items: {product: ApiProduct; quantity: number}[];
}
