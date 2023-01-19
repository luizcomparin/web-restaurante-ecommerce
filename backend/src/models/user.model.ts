import { model, Schema } from "mongoose";

export interface IAddress {
	addressLabel: string;
	zipCode: string;
	state: string;
	city: string;
	district: string;
	street: string;
	residenceNumber: number;
}

export interface User {
	id: string;
	name: string;
	cpf: string;
	cellphone: number;
	email: string;
	password: string;
	addresses: IAddress[];
	isAdmin: boolean;
}

export const AddressSchema = new Schema<IAddress>({
	addressLabel: String,
	zipCode: String,
	state: String,
	city: String,
	district: String,
	street: String,
	residenceNumber: Number,
});

export const UserSchema = new Schema<User>(
	{
		name: { type: String, required: true },
		cpf: { type: String, required: true },
		cellphone: { type: Number, required: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String, required: true },
		addresses: [{ type: AddressSchema, required: true }],
		isAdmin: { type: Boolean, required: true },
	},
	{
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
		timestamps: true,
	}
);

export const UserModel = model<User>("user", UserSchema);
