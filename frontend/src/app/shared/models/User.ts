// import { IAddress } from "../interfaces/IAddress";

import { IAddress } from '../interfaces/IAddress';

export class User {
	id!: string;
	name!: string;
	cpf!: string;
	cellphone!: number;
	email!: string;
	addresses!: IAddress[];
	token!: string;
	isAdmin!: boolean;
}
