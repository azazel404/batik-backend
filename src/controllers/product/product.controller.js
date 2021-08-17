import { product } from "../../models";
import { successResponse, errorResponse } from "../../helpers";
import UploadImage from "../../middleware/UploadImage";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

export const list = async (req, res) => {
	try {
		const result = await product.findAll({ include: ["categories"] });
		return successResponse(req, res, "", result);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const productClient = async (req, res) => {
	try {
		const result = await product.findAll({
			include: ["categories"],
			where: {
				name: {
					[Op.like]: "%" + req.body.search + "%",
				},
			},
		});
		return successResponse(req, res, "", result);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const create = async (req, res) => {
	try {
		const { code, name, price, image, description, category_id, stock, weight } =
			req.body;
		const payload = {
			code,
			name,
			price,
			image: req.file && `/images/${req.file.filename}`,
			description,
			category_id,
			stock,
			weight,
		};

		const created = await product.create(payload);
		return successResponse(req, res, "successfully created", created);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const update = async (req, res) => {
	try {
		const { code, name, price, image, description, category_id, stock, weight } =
			req.body;

		// let location = image ? image : `${process.env.URLFILE}/images/${req.file.filename}`;

		const payload = {
			code,
			name,
			price,
			image: image ? image : `/images/${req.file.filename}`,
			description,
			category_id,
			stock,
			weight,
		};

		let find = await product.findByPk(req.params.id);

		if (!find) {
			return res.status(400).send({ message: "data not found" });
		} else {
			const updated = await find.update(payload);
			return successResponse(req, res, "successfully updated", updated);
		}
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const deleted = async (req, res) => {
	try {
		let find = await product.findByPk(req.params.id);

		if (!find) {
			return res.status(400).send({ message: "data not found" });
		} else {
			const destroy = await find.destroy();
			return successResponse(req, res, "successfully deleted");
		}
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};
