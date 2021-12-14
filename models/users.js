'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    sex: DataTypes.STRING,
    dni: DataTypes.STRING,
    role: DataTypes.NUMBER,
    birth_date: DataTypes.DATE,
  }, {
    timestamps: false
  });
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};