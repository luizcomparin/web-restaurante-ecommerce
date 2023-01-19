// import { IAddress } from "./IAddress";

import { IAddress } from './IAddress';

export interface IUserRegister {
	name: string;
	cpf: string;
	cellphone: number;
	email: string;
	password: string;
	confirmPassword: string;
	addresses: IAddress[];
}
