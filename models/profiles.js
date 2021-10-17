'use strict';
module.exports = (sequelize, DataTypes) => {
  const profiles = sequelize.define('profiles', {
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    sex: DataTypes.STRING,
    dni: DataTypes.STRING,
    role: DataTypes.NUMBER,
    birth_date: DataTypes.DATE,
  }, {});
  profiles.associate = function(models) {
    // associations can be defined here
  };
  return profiles;
};