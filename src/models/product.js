"use strict";
module.exports = (sequelize, DataTypes) => {
	const product = sequelize.define(
		"product",
		{
			code: DataTypes.STRING,
			name: DataTypes.STRING,
			price: DataTypes.STRING,
			image: DataTypes.STRING,
			description: DataTypes.STRING,
			category_id: DataTypes.INTEGER,
			stock: DataTypes.STRING,
			weight: DataTypes.STRING,
		},
		{}
	);
	product.associate = function (models) {
		// associations can be defined here
		product.belongsTo(models.category, {
			foreignKey: "category_id",
			as: "categories",
		});
	};
	return product;
};
