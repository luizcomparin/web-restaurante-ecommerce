import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from "bcryptjs";

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

router.post(
	"/update",
	asyncHandler(async (req, res) => {
		const { name, cpf, cellphone, email, address } = req.body;
		// Destructuring assignment
		const user = await UserModel.findOne({ email });
		// const current_user = localStorage.getItem(email);
		// UserModel.updateOne(email:email,)
		if (user) {
			user.name = name;
			user.cpf = cpf;
			user.cellphone = cellphone;
			user.addresses[0].addressLabel = address.addressLabel;
			user.addresses[0].zipCode = address.zipCode;
			user.addresses[0].state = address.state;
			user.addresses[0].city = address.city;
			user.addresses[0].district = address.district;
			user.addresses[0].street = address.street;
			user.addresses[0].residenceNumber = address.residenceNumber;
			await user.save();
			res.send(
				generateTokenReponse(user)
				// [{
				// 	"db.address": user,
				// },
				// { "req.address": req.body }]
			);
			// Só falta agora salvar o req.body no User

			// console.log("LS user: ", current_user);
			// console.log("req.body: ", req.body);
			// console.log("req.params: ", req.params);
			return;
		} else {
			res.send({ message: "nao tem email assim no banco" });
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

		const newUser: User = {
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

const generateTokenReponse = (user: User) => {
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
