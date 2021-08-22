"use strict";
module.exports = (sequelize, DataTypes) => {
	const orders = sequelize.define(
		"orders",
		{
			code: DataTypes.STRING,
			product_id: DataTypes.INTEGER,
			users_id: DataTypes.INTEGER,
			driver_id: DataTypes.INTEGER,
			start_date: DataTypes.DATE,
			end_date: DataTypes.DATE,
			trans_date: DataTypes.DATE,
			qty: DataTypes.INTEGER,
			resi: DataTypes.STRING,
			image: DataTypes.STRING,
			status: DataTypes.STRING,
		},
		{}
	);
	orders.associate = function (models) {
		// associations can be defined here
		orders.belongsTo(models.product, {
			foreignKey: "product_id",
			as: "products",
		});
		orders.belongsTo(models.User, {
			foreignKey: "users_id",
			as: "users",
		});
		orders.belongsTo(models.driver, {
			foreignKey: "driver_id",
			as: "drivers",
		});
	};
	return orders;
};
