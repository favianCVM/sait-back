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
    profile_picture: DataTypes.STRING,
    profile_picture_id: DataTypes.STRING,
  }, {
    timestamps: false,
    underscored: true,
  });
  users.associate = function(models) {
    // associations can be defined here
    // models.users.hasOne(models.devices)

    models.users.hasMany(models.incidences)

  };
  return users;
};