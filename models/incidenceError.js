"use strict";

module.exports = (sequelize, DataTypes) => {
  const incidenceError = sequelize.define(
    "incidenceError",
    {
      incidence_id: DataTypes.INTEGER,
      error_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  incidenceError.associate = function (models) {
    // associations can be defined here

    models.incidenceError.belongsTo(models.incidences, {
      // as: 'users', //this is not necessary
      through: { model: incidenceError },
      targetKey: "id",
      foreignKey: "incidence_id",
    });

    models.incidenceError.belongsTo(models.errors, {
      // as: 'users', //this is not necessary
      through: { model: incidenceError },
      targetKey: "id",
      foreignKey: "error_id",
    });
  };
  return incidenceError;
};
