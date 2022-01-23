"use strict";

module.exports = (sequelize, DataTypes) => {
  const errors = sequelize.define(
    "errors",
    {
      description: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  errors.associate = function (models) {
    // associations can be defined here
    models.errors.hasMany(models.incidenceError);
  };
  return errors;
};
