"use strict";

module.exports = (sequelize, DataTypes) => {
  const errors = sequelize.define(
    "errors",
    {
      description: DataTypes.INTEGER,
      incidence_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  errors.associate = function (models) {
    // associations can be defined here
    models.errors.belongsTo(models.incidences, {
      // as: 'users', //this is not necessary
      through: { model: errors },
      targetKey: "id",
      foreignKey: "incidence_id",
    });

    models.errors.hasMany(models.errorComponent);
  };
  return errors;
};
