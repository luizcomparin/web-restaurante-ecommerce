// import { IAddress } from "./IAddress";

import { IAddress } from './IAddress';

export interface IUserUpdate {
	name: string;
	cpf: string;
	cellphone: number;
	email: string;
	address: IAddress;
}
