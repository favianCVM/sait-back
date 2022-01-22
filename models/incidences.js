"use strict";

module.exports = (sequelize, DataTypes) => {
  const incidences = sequelize.define(
    "incidences",
    {
      incidence_type: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
      location: DataTypes.STRING,
      priority: DataTypes.INTEGER
    },
    {
      timestamps: false,
      underscored: true,
    }
  );

  incidences.associate = function (models) {
    // associations can be defined here

    models.incidences.belongsTo(models.users, {
      // as: 'users', //this is not necessary
      through: { model: incidences },
      targetKey: "id",
      foreignKey: "user_id",
    });

    models.incidences.hasMany(models.incidenceError);
    models.incidences.hasMany(models.deviceIncidence);
  };

  return incidences;
};
