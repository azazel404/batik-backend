import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../../models";
import { successResponse, errorResponse } from "../../helpers";

export const list = async (req, res) => {
	try {
		const result = await User.findAll({});
		return successResponse(req, res, "", result);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const create = async (req, res) => {
	try {
		const { name, password, address, email, phone_number } = req.body;
		const reqPass = crypto.createHash("md5").update(password).digest("hex");
		const payload = {
			name,
			password: reqPass,
			address,
			email,
			phone_number,
		};

		const created = await User.create(payload);
		return successResponse(req, res, "successfully created", created);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const update = async (req, res) => {
	try {
		const { name, password, address, email, phone_number } = req.body;
		const reqPass = crypto.createHash("md5").update(password).digest("hex");
		const payload = {
			name,
			password: reqPass,
			address,
			email,
			phone_number,
		};

		let find = await User.findByPk(req.params.id);

		if (!find) {
			return res.status(400).send({ message: "data not found" });
		} else {
			const updated = await find.update(payload);
			return successResponse(req, res, "successfully  updated", updated);
		}
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const deleted = async (req, res) => {
	try {
		let find = await User.findByPk(req.params.id);

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

export const register = async (req, res) => {
	try {
		const { name, password, address, email, phone_number } = req.body;
		const user = await User.scope("withSecretColumns").findOne({
			where: { email },
		});
		if (user) {
			throw new Error("User already exists with same email");
		}
		const reqPass = crypto.createHash("md5").update(password).digest("hex");
		const payload = {
			name,
			address,
			email,
			phone_number,
			password: reqPass,
		};

		const newUser = await User.create(payload);
		return successResponse(req, res, "sukses daftar");
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const login = async (req, res) => {
	try {
		const user = await User.scope("withSecretColumns").findOne({
			where: { email: req.body.email },
		});
		if (!user) {
			throw new Error("Incorrect Email Id/Password");
		}
		const reqPass = crypto
			.createHash("md5")
			.update(req.body.password || "")
			.digest("hex");
		if (reqPass !== user.password) {
			throw new Error("Incorrect Email Id/Password");
		}
		const token = jwt.sign(
			{
				user: {
					userId: user.id,
					email: user.email,
					createdAt: new Date(),
				},
			},
			process.env.SECRET
		);
		let data = {
			isAdmin: user.isAdmin,
			token: token,
		};
		delete user.dataValues.password;
		return successResponse(req, res, "", data);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const profile = async (req, res) => {
	try {
		const { userId } = req.user;
		const user = await User.findOne({ where: { id: userId } });
		return successResponse(req, res, "", user);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

// export const changePassword = async (req, res) => {
//   try {
//     const { userId } = req.user;
//     const user = await User.scope('withSecretColumns').findOne({
//       where: { id: userId },
//     });

//     const reqPass = crypto
//       .createHash('md5')
//       .update(req.body.oldPassword)
//       .digest('hex');
//     if (reqPass !== user.password) {
//       throw new Error('Old password is incorrect');
//     }

//     const newPass = crypto
//       .createHash('md5')
//       .update(req.body.newPassword)
//       .digest('hex');

//     await User.update({ password: newPass }, { where: { id: user.id } });
//     return successResponse(req, res, {});
//   } catch (error) {
//     return errorResponse(req, res, error.message);
//   }
// };
