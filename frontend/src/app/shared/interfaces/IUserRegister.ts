export interface IUserRegister {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	address: {
		cep: string;
		state: string;
		city: string;
		district: string;
		street: string;
		residenceNumber: number;
	};
}
