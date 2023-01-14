export interface IUserRegister {
	name: string;
	cpf: string;
	cellphone: number;
	email: string;
	password: string;
	confirmPassword: string;
	address: {
		zipCode: string;
		state: string;
		city: string;
		district: string;
		street: string;
		residenceNumber: number;
	};
}
