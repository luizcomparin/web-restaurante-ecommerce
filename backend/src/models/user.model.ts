import { model, Schema } from "mongoose";

export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	cellphone: number;
	address: {
		zipCode: string;
		state: string;
		city: string;
		district: string;
		street: string;
		residenceNumber: number;
	};
	isAdmin: boolean;
}

export const AddressSchema = new Schema({
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
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String, required: true },
		cellphone: { type: Number, required: true },
		address: { type: AddressSchema, required: true },
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
