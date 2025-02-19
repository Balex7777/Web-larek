import { formErrors, IAppState, IOrder, IProductList } from '../types';
import { Model } from './base/Model';
import { IBasket } from './Basket';
import { IProduct } from './Product';
import _ from 'lodash';

export class ProductItem extends Model<IProduct> {
	id: string;
	title: string;
	image: string;
	category: string;
	description: string;
	price: number;
}

export class AppState extends Model<IAppState> {
	basket: IBasket;
	gallery: ProductItem[];
	order: IOrder;
	loading: boolean;
	formErrors: formErrors = {};

	getTotal() {
		return this.order.items.reduce(
			(ans, item) => ans + this.gallery.find((it) => it.id === item).price,
			0
		);
	}

	getBasketTotal() {
		return this.basket.total;
	}

	setGallery(products: IProductList) {
		console.log(products);
		this.gallery = products.items.map(
			(product) => new ProductItem(product, this.events)
		);
		this.emitChanges('items:changed', { gallery: this.gallery });
	}

	toggleOrderedProduct(id: string, isIncluded: boolean) {
		if (isIncluded) {
			this.order.items = _.uniq([...this.order.items, id]);
		} else {
			this.order.items = _.without(this.order.items, id);
		}
	}

	clearBasket() {
		this.order.items.forEach((id) => {
			this.toggleOrderedProduct(id, false);
		});
	}

	setOrderField(field: keyof IOrder, value: string) {
		console.log(this.order[field], field, value);

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
