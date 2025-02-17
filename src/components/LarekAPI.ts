import { IOrderResult, IProductList } from '../types';
import { IOrder } from './Order';
import { IProduct } from './Product';

export interface ILarekAPI {
	getProductList(): Promise<IProductList>;
	getProduct(id: string): Promise<IProduct>;
	makeOrder(order: IOrder): Promise<IOrderResult>;
}
