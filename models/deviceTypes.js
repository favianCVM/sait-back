"use strict";

module.exports = (sequelize, DataTypes) => {
  const deviceTypes = sequelize.define(
    "deviceTypes",
    {
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true,
    }
  );

  deviceTypes.associate = function (models) {
    // associations can be defined here
    // models.types.hasOne(models.devices)
    models.deviceTypes.hasMany(models.devices);
  };
  return deviceTypes;
};
