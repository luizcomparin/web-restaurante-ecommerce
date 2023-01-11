export class User {
	id!: string;
	name!: string;
	email!: string;
	cellphone!: number;
	address!: {
		zipCode: string;
		state: string;
		city: string;
		district: string;
		street: string;
		residenceNumber: number;
	};
	token!: string;
	isAdmin!: boolean;
}
