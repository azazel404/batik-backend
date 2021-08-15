"use strict";
module.exports = (sequelize, DataTypes) => {
	const cart = sequelize.define(
		"cart",
		{
			users_id: DataTypes.INTEGER,
			product_id: DataTypes.INTEGER,
			qty: DataTypes.INTEGER,
		},
		{}
	);
	cart.associate = function (models) {
		// associations can be defined here
		// associations can be defined here
		cart.belongsTo(models.product, {
			foreignKey: "product_id",
			as: "products",
		});
		cart.belongsTo(models.User, {
			foreignKey: "users_id",
			as: "users",
		});
	};
	return cart;
};
