const Joi = require("joi");

export const getOtherUserProfile = {
	body: {
		userId: Joi.number().required(),
	},
};

export const register = {
	body: {
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	},
};

export const login = {
	body: {
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	},
};
