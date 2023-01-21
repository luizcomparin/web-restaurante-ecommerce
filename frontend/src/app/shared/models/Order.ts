import { LatLng } from 'leaflet';
import { CartItem } from './CartItem';

export class Address {
	addressLabel!: string;
	zipCode!: string;
	state!: string;
	city!: string;
	district!: string;
	street!: string;
	residenceNumber!: number;
}

export class Order {
	id!: number;
	items!: CartItem[];
	totalPrice!: number;
	name!: string;
	address!: Address;
	addressLatLng?: LatLng;
	paymentId!: string;
	createdAt!: string;
	status!: string;

	constructor() {
		this.address = new Address();
	}
}

//	Posteriormente, tentar substituir essas classes todas por Interfaces como a de baixo.
// export interface IOrder {
// 	id: number;
// 	items: CartItem[];
// 	totalPrice: number;
// 	name: string;
// 	address: {
// 		zipCode: string;
// 		state: string;
// 		city: string;
// 		district: string;
// 		street: string;
// 		residenceNumber: number;
// 	};
// 	addressLatLng?: LatLng;
// 	paymentId: string;
// 	createdAt: string;
// 	status: string;
// }
