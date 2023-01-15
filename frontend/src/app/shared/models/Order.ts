import { LatLng } from 'leaflet';
import { CartItem } from './CartItem';

export class Order {
	id!: number;
	items!: CartItem[];
	totalPrice!: number;
	name!: string;
	address!: {
		zipCode: string;
		state: string;
		city: string;
		district: string;
		street: string;
		residenceNumber: number;
	};
	addressLatLng?: LatLng;
	paymentId!: string;
	createdAt!: string;
	status!: string;
}
