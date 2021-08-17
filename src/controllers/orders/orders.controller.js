import { orders, product, cart } from "../../models";
import { successResponse, errorResponse } from "../../helpers";

export const list = async (req, res) => {
	try {
		const result = await orders.findAll({ include: ["products", "users", "drivers"] });
		return successResponse(req, res, "", result);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const getCurrentOrder = async (req, res) => {
	try {
		const result = await orders.findAll({
			include: ["products", "users", "drivers"],
			where: { users_id: req.body.userId, status: req.body.status },
		});
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

export const bulkOrder = async (req, res) => {
	const { requestOrder } = req.body;

	requestOrder.forEach(async (orderData) => {
		let getProduct = await product.findByPk(orderData.product_id);
		let getCart = await cart.findByPk(orderData.id);
		if (!getProduct) {
			return res.status(400).json({
				message: "product not Found",
			});
		}

		if (!getCart) {
			return res.status(400).json({
				message: "cart not Found",
			});
		}

		if (orderData.qty > getProduct.stock) {
			return res.json({
				message: "exceeded the stock limit",
			});
		}

		await product
			.findByPk(orderData.product_id)
			.then((res) => {
				res
					.update({
						stock: getProduct.stock - orderData.qty,
					})
					.catch((err) => {
						return res.status(400).send(err);
					});
			})
			.catch((err) => {
				return res.status(400).send(err);
			});

		const payload = {
			code: `INV-${Math.round(Math.random() * 1000000)}`,
			product_id: orderData.product_id,
			users_id: orderData.users_id,
			start_date: Date(),
			trans_date: Date(),
			qty: orderData.qty,
			status: 0,
		};

		const createTransaction = await orders.create(payload);
		const destroy = await getCart.destroy();
		if (!createTransaction) {
			return res.status(400).send("Failed Transaction");
		}

		return res.status(201).json({
			message: "Process Succesfully create Transaction orders",
		});
	});
};

export const update = async (req, res) => {
	try {
		const {
			// code,
			// product_id,
			// users_id,
			driver_id,
			resi,
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
			resi,
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
