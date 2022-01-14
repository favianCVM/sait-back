"use strict";

module.exports = (sequelize, DataTypes) => {
  const deviceIncidence = sequelize.define(
    "deviceIncidence",
    {
      device_id: DataTypes.INTEGER,
      incidence_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  deviceIncidence.associate = function (models) {
    // associations can be defined here

    models.deviceIncidence.belongsTo(models.devices, {
      // as: 'users', //this is not necessary
      through: { model: deviceIncidence },
      targetKey: "id",
      foreignKey: "device_id",
    });

    models.deviceIncidence.belongsTo(models.incidences, {
      // as: 'users', //this is not necessary
      through: { model: deviceIncidence },
      targetKey: "id",
      foreignKey: "incidence_id",
    });
  };
  return deviceIncidence;
};
