// import { IAddress } from "./IAddress";

import { IAddress } from './IAddress';

export interface IUserUpdate {
	oldEmail: string;
	name: string;
	cpf: string;
	cellphone: number;
	email: string;
	addresses: IAddress[];
}
