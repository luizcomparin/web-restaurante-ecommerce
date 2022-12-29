import { Router } from "express";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderStatusEnum } from "../constants/order_status";
import auth from "../middlewares/auth.mid";
import { OrderModel } from "../models/order.model";
const router = Router();
router.use(auth);

router.post(
	"/create",
	asyncHandler(async (req: any, res: any) => {
		const requestOrder = req.body;

		if (requestOrder.items.length <= 0) {
			res.status(HTTP_BAD_REQUEST).send("O carrinho está vazio.");
			return;
		}

		await OrderModel.deleteOne({
			user: req.user.id,
			status: OrderStatusEnum.NEW,
		});

		const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
		await newOrder.save();
		res.send(newOrder);
		// res.send("ALO");
	})
);

export default router;
