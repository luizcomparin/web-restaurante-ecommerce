import { model, Schema, Types } from "mongoose";
import { OrderStatusEnum } from "../constants/order_status";
import { Food, FoodSchema } from "./food.model";
import { IAddress } from "./user.model";

export interface LatLng {
	lat: string;
	lng: string;
}

export const LatLngSchema = new Schema<LatLng>({
	lat: { type: String, required: true },
	lng: { type: String, required: true },
});

export interface OrderItem {
	food: Food;
	price: number;
	quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>({
	food: { type: FoodSchema, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
});

export interface Order {
	id: string;
	items: OrderItem[];
	totalPrice: number;
	name: string;
	address: IAddress;
	addressLatLng: LatLng;
	paymentId: string;
	status: OrderStatusEnum;
	user: Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

export const AddressSchema = new Schema<IAddress>({
	addressLabel: { type: String, required: true },
	zipCode: { type: String, required: true },
	state: { type: String, required: true },
	city: { type: String, required: true },
	district: { type: String, required: true },
	street: { type: String, required: true },
	residenceNumber: { type: Number, required: true },
});

const orderSchema = new Schema<Order>(
	{
		name: { type: String, required: true },
		address: { type: AddressSchema, required: true },
		addressLatLng: { type: LatLngSchema, required: true },
		paymentId: { type: String },
		totalPrice: { type: Number, required: true },
		items: { type: [OrderItemSchema], required: true },
		status: { type: String, default: OrderStatusEnum.NEW },
		user: { type: Schema.Types.ObjectId, required: true },
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
	}
);

export const OrderModel = model("order", orderSchema);
