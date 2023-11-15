import {Product} from '../../products/types/Product';

export interface Purchase {
  date: string;
  items: Product[];
}
