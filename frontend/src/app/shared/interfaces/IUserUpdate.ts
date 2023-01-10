export interface IUserUpdate {
	name: string;
	email: string;
	address: {
		cep: string;
		state: string;
		city: string;
		district: string;
		street: string;
		residenceNumber: number;
	};
}
