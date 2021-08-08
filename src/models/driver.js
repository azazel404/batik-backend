'use strict';
module.exports = (sequelize, DataTypes) => {
  const driver = sequelize.define('driver', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {});
  driver.associate = function(models) {
    // associations can be defined here
  };
  return driver;
};