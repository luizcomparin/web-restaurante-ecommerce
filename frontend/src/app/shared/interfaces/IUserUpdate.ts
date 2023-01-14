export interface IUserUpdate {
	name: string;
	cpf: string;
	cellphone: number;
	email: string;
	address: {
		zipCode: string;
		state: string;
		city: string;
		district: string;
		street: string;
		residenceNumber: number;
	};
}
