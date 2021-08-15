import { cart } from "../../models";
import { successResponse, errorResponse } from "../../helpers";

export const list = async (req, res) => {
	try {
		const result = await cart.findAll({ include: ["products", "users"] });
		return successResponse(req, res, "", result);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const create = async (req, res) => {
	try {
		const { users_id, product_id, qty } = req.body;
		const payload = {
			users_id,
			product_id,
			qty,
		};
		const created = await cart.create(payload);
		return successResponse(req, res, "successfully created", created);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const update = async (req, res) => {
	try {
		const { users_id, product_id, qty } = req.body;
		const payload = {
			users_id,
			product_id,
			qty,
		};

		let find = await cart.findByPk(req.params.id);

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
		let find = await cart.findByPk(req.params.id);

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
