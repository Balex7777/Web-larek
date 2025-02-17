import { IProduct } from '../components/Product';

export interface IProductList {
	products: IProduct[];
	setProducts(): void;
}

export interface IOrderResult {
	id: string;
	total: number;
}
