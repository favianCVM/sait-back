"use strict";

module.exports = (sequelize, DataTypes) => {
  const technicianIncidence = sequelize.define(
    "technicianIncidence",
    {
      incidence_id: DataTypes.INTEGER,
      technician_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
    }
  );

  technicianIncidence.associate = function (models) {
    // associations can be defined here

    models.technicianIncidence.belongsTo(models.incidences, {
      // as: 'users', //this is not necessary
      through: { model: technicianIncidence },
      targetKey: "id",
      foreignKey: "incidence_id",
    });

    models.technicianIncidence.belongsTo(models.technicians, {
      // as: 'users', //this is not necessary
      through: { model: technicianIncidence },
      targetKey: "id",
      foreignKey: "technician_id",
    });
  };

  return technicianIncidence;
};
