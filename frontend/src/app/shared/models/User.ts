export class User {
	id!: string;
	email!: string;
	name!: string;
	address!: {
		cep: string;
		state: string;
		city: string;
		district: string;
		street: string;
		residenceNumber: number;
	};
	token!: string;
	isAdmin!: boolean;
}
