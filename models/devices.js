"use strict";

module.exports = (sequelize, DataTypes) => {
  const devices = sequelize.define(
    "devices",
    {
      serial: {
        field: "serial",
        type: DataTypes.STRING,
      },
      device_type_id: {
        field: "device_type_id",
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  devices.associate = function (models) {
    // associations can be defined here
    models.devices.belongsTo(models.deviceTypes, {
      // as: 'users',
      through: { model: devices },
      targetKey: "id",
      foreignKey: "device_type_id",
    });

    models.devices.hasMany(models.deviceItem);
    models.devices.hasMany(models.incidences);
  };
  return devices;
};
