"use strict";

module.exports = (sequelize, DataTypes) => {
  const errorComponent = sequelize.define(
    "errorComponent",
    {
      error_id: DataTypes.INTEGER,
      component_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  errorComponent.associate = function (models) {
    // associations can be defined here

    models.errorComponent.belongsTo(models.errors, {
      // as: 'users', //this is not necessary
      through: { model: errorComponent },
      targetKey: "id",
      foreignKey: "error_id",
    });

    models.errorComponent.belongsTo(models.components, {
      // as: 'users', //this is not necessary
      through: { model: errorComponent },
      targetKey: "id",
      foreignKey: "component_id",
    });
  };
  return errorComponent;
};
