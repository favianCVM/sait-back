"use strict";

module.exports = (sequelize, DataTypes) => {
  const incidences = sequelize.define(
    "incidences",
    {
      incidence_type: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      device_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
      location: DataTypes.STRING,
      priority: DataTypes.INTEGER,
      status: DataTypes.STRING,
      date: DataTypes.DATE,
      end_date: DataTypes.DATE,
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

    models.incidences.belongsTo(models.devices, {
      // as: 'users', //this is not necessary
      through: { model: incidences },
      targetKey: "id",
      foreignKey: "device_id",
    });

    models.incidences.hasMany(models.incidenceError);
    models.incidences.hasMany(models.technicianIncidence);
  };

  return incidences;
};
