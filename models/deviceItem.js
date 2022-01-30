"use strict";

module.exports = (sequelize, DataTypes) => {
  const deviceItem = sequelize.define(
    "deviceItem",
    {
      device_id: DataTypes.INTEGER,
      item_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  deviceItem.associate = function (models) {
    // associations can be defined here

    models.deviceItem.belongsTo(models.devices, {
      // as: 'users', //this is not necessary
      through: { model: deviceItem },
      targetKey: "id",
      foreignKey: "device_id",
    });

    models.deviceItem.belongsTo(models.items, {
      // as: 'users', //this is not necessary
      through: { model: deviceItem },
      targetKey: "id",
      foreignKey: "item_id",
    });
  };
  return deviceItem;
};
