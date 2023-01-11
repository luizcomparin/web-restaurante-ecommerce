export interface IUserRegister {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
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
