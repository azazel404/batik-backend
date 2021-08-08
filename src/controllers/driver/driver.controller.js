import { driver } from "../../models";
import { successResponse, errorResponse } from "../../helpers";

export const list = async (req, res) => {
	try {
		const result = await driver.findAll({});
		return successResponse(req, res, "", result);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const create = async (req, res) => {
	try {
		const { code, name, phone_number } = req.body;
		const payload = {
			code,
			name,
			phone_number,
		};
		const created = await driver.create(payload);
		return successResponse(req, res, "successfully created", created);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const update = async (req, res) => {
	try {
		const { code, name, phone_number } = req.body;
		const payload = {
			code,
			name,
			phone_number,
		};

		let find = await driver.findByPk(req.params.id);

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
		let find = await driver.findByPk(req.params.id);

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
