"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("products", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			code: {
				type: Sequelize.STRING,
			},
			name: {
				type: Sequelize.STRING,
			},
			price: {
				type: Sequelize.STRING,
			},
			image: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
			category_id: {
				type: Sequelize.INTEGER,
			},
			stock: {
				type: Sequelize.STRING,
			},
			weight: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("products");
	},
};
