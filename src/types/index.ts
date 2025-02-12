export interface IProduct {
	id: string;
	title: string;
	image: string;
	category: string;
	description: string;
	price: number;
}

export interface IProductList {
	products: IProduct[];
	fetchData(): void;
}

export interface ICart {
	products: Map<string, IProduct>;
	addProduct(id: string): void;
	removeProduct(id: string): void;
}

export interface Order {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
	getProductsFromCart(cart: ICart): void;
}
