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
    models.types.hasMany(models.incidences)
  };
  return types;
};
