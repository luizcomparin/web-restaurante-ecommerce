export interface IUserUpdate {
	name: string;
	email: string;
	cellphone: number;
	address: {
		zipCode: string;
		state: string;
		city: string;
		district: string;
		street: string;
		residenceNumber: number;
	};
}
