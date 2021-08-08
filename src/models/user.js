module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			name: {
				type: DataTypes.STRING,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			address: {
				type: DataTypes.STRING,
			},
			email: {
				type: DataTypes.STRING,
			},
			phone_number: {
				type: DataTypes.STRING,
			},
			profile: {
				type: DataTypes.STRING,
			},
			isAdmin: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			defaultScope: {
				attributes: { exclude: ["password"] },
			},
			scopes: {
				withSecretColumns: {
					attributes: { include: ["password"] },
				},
			},
		}
	);
	User.associate = function (models) {
		// associations can be defined here
	};
	return User;
};
