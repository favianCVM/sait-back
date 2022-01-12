"use strict";

module.exports = (sequelize, DataTypes) => {
  const types = sequelize.define(
    "types",
    {
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  types.associate = function (models) {
    // associations can be defined here
    // models.types.hasOne(models.devices)
  };
  return types;
};
