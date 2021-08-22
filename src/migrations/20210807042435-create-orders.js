"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("orders", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			code: {
				type: Sequelize.STRING,
			},
			product_id: {
				type: Sequelize.INTEGER,
			},
			users_id: {
				type: Sequelize.INTEGER,
			},
			driver_id: {
				type: Sequelize.INTEGER,
			},
			start_date: {
				type: Sequelize.DATE,
			},
			end_date: {
				type: Sequelize.DATE,
			},
			trans_date: {
				type: Sequelize.DATE,
			},
			qty: {
				type: Sequelize.INTEGER,
			},
			image: {
				type: Sequelize.STRING,
			},
			status: {
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
		return queryInterface.dropTable("orders");
	},
};
