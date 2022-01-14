"use strict";

module.exports = (sequelize, DataTypes) => {
  const incidences = sequelize.define(
    "incidences",
    {
      type_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  incidences.associate = function (models) {
    // associations can be defined here
    models.incidences.belongsTo(models.types, {
      // as: 'users', //this is not necessary
      through: { model: incidences },
      targetKey: "id",
      foreignKey: "type_id",
    });

    models.incidences.hasMany(models.incidenceError)
    models.incidences.hasMany(models.userIncidence)

  };
  return incidences;
};
