import { Router } from "express";
import asyncHandler from "express-async-handler";
import { sample_foods, sample_tags } from "../data";
import { FoodModel } from "../models/food.model";

const router = Router();

// Envia dados da tabela de alimentos ao MongoDB
router.get(
	"/seed",
	asyncHandler(async (req, res) => {
		const foodsCount = await FoodModel.countDocuments();
		if (foodsCount > 0) {
			res.send("A Seed já foi feita.");
			return;
		}

		await FoodModel.create(sample_foods);
		res.send("A Seed está pronta.");
	})
);

// getAll
router.get(
	"/",
	asyncHandler(async (req, res) => {
		const foods = await FoodModel.find();
		res.send(foods);
	})
);

// getAllFoodsBySearchTerm
router.get(
	"/search/:searchTerm",
	asyncHandler(async (req, res) => {
		const searchRegex = new RegExp(req.params.searchTerm, "i");
		const foods = await FoodModel.find({ name: { $regex: searchRegex } });
		res.send(foods);
	})
);

// getAllTags
router.get(
	"/tags",
	asyncHandler(async (req, res) => {
		const tags = await FoodModel.aggregate([
			{
				$unwind: "$tags",
				// 2 foods 3 tags, unwind tags => 6 foods tags 1
			},
			{
				$group: {
					_id: "$tags",
					count: { $sum: 1 },
				},
			},
			{
				$project: {
					_id: 0,
					name: "$_id",
					count: "$count",
				},
			},
		]).sort({ count: -1 });

		const all = {
			name: "All",
			count: await FoodModel.countDocuments(),
		};

		tags.unshift(all);
		res.send(tags);
	})
);

// getAllFoodsByTag
router.get(
	"/tag/:tagName",
	asyncHandler(async (req, res) => {
		const foods = await FoodModel.find({ tags: req.params.tagName });
		res.send(foods);
	})
);

// getFoodById
router.get(
	"/:foodId",
	asyncHandler(async (req, res) => {
		const food = await FoodModel.findById(req.params.foodId);
		res.send(food);
	})
);

export default router;
