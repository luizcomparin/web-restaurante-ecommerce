import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { IAddress, IUser, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

const router = Router();

// Envia dados da tabela de usuarios ao MongoDB
// router.get(
// 	"/seed",
// 	asyncHandler(async (req, res) => {
// 		const usersCount = await UserModel.countDocuments();
// 		if (usersCount > 0) {
// 			res.send("A Seed já foi feita.");
// 			return;
// 		}

// 		await UserModel.create(sample_users);
// 		res.send("A Seed está pronta.");
// 	})
// );

router.post(
	"/login",
	asyncHandler(async (req, res) => {
		const { email, password } = req.body;
		// Destructuring assignment
		const user = await UserModel.findOne({ email });

		if (user && (await bcrypt.compare(password, user.password))) {
			res.send(generateTokenReponse(user));
		} else {
			res.status(HTTP_BAD_REQUEST).send("Usuário ou senha inválidos.");
		}
	})
);

interface IUserUpdate {
	oldEmail: string;
	name: string;
	cpf: string;
	cellphone: number;
	email: string;
	addresses: IAddress[];
}

router.post(
	"/update",
	asyncHandler(async (req: Request<{}, {}, IUserUpdate>, res: Response) => {
		const { oldEmail, name, cpf, cellphone, email, addresses } = req.body;
		// Destructuring assignment
		const dbUser = await UserModel.findOne({
			email: oldEmail,
		});

		if (dbUser) {
			// console.log("oldEmail: ", oldEmail);
			// console.log("dbUser: ", dbUser);
			// console.log("req.body: ", req.body);

			dbUser.name = name;
			dbUser.cpf = cpf;
			dbUser.cellphone = cellphone;
			dbUser.email = email;
			dbUser.addresses = addresses;

			await dbUser.save();

			res.send(generateTokenReponse(dbUser));
			return;
		} else {
			res.send({ message: "Email não encontrado" });
			return;
		}
	})
);

router.post(
	"/register",
	asyncHandler(async (req, res) => {
		const { name, cpf, cellphone, email, password, addresses } = req.body;
		// Destructuring assignment
		const user = await UserModel.findOne({ email });
		if (user) {
			res.status(HTTP_BAD_REQUEST).send("Este email já está cadastrado.");
			return;
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

		const newUser: IUser = {
			id: "",
			name,
			cpf,
			cellphone,
			email: email.toLowerCase(),
			password: encryptedPassword,
			addresses,
			isAdmin: false,
		};

		const dbUser = await UserModel.create(newUser);
		res.send(generateTokenReponse(dbUser));
	})
);

const generateTokenReponse = (user: IUser) => {
	const token = jwt.sign(
		{
			id: user.id,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		process.env.JWT_SECRET!,
		{
			expiresIn: "3d",
		}
	);

	return {
		id: user.id,
		name: user.name,
		cpf: user.cpf,
		cellphone: user.cellphone,
		email: user.email,
		addresses: user.addresses,
		isAdmin: user.isAdmin,
		token: token,
	};
};

export default router;
