import { orders } from "../../models";
import { successResponse, errorResponse } from "../../helpers";

export const list = async (req, res) => {
	try {
		const result = await orders.findAll({ include: ["products", "users", "drivers"] });
		return successResponse(req, res, "", result);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const create = async (req, res) => {
	try {
		const {
			code,
			product_id,
			users_id,
			// driver_id,
			start_date,
			end_date,
			trans_date,
			qty,
			// document,
			status,
		} = req.body;
		const payload = {
			code,
			product_id,
			users_id,
			// driver_id,
			start_date,
			end_date,
			trans_date,
			qty,
			// document,
			status,
		};
		const created = await orders.create(payload);
		return successResponse(req, res, "successfully created", created);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const update = async (req, res) => {
	try {
		const {
			// code,
			// product_id,
			// users_id,
			driver_id,
			// start_date,
			// end_date,
			// trans_date,
			document,
			status,
		} = req.body;
		const payload = {
			// code,
			// product_id,
			// users_id,
			driver_id,
			// start_date,
			// end_date,
			// trans_date,
			document,
			status,
		};

		let find = await orders.findByPk(req.params.id);

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

export const cancelOrder = async (req, res) => {
	try {
		const { status } = req.body;
		const payload = {
			status,
		};

		let find = await orders.findByPk(req.params.id);

		if (!find) {
			return res.status(400).send({ message: "data not found" });
		} else {
			const updated = await find.update(payload);
			return successResponse(req, res, "successfully Closeed", updated);
		}
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const deleted = async (req, res) => {
	try {
		let find = await orders.findByPk(req.params.id);

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
