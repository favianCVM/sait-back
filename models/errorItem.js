"use strict";

module.exports = (sequelize, DataTypes) => {
  const errorItem = sequelize.define(
    "errorItem",
    {
      error_id: DataTypes.INTEGER,
      item_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  errorItem.associate = function (models) {
    // associations can be defined here

    models.errorItem.belongsTo(models.errors, {
      // as: 'users', //this is not necessary
      through: { model: errorItem },
      targetKey: "id",
      foreignKey: "error_id",
    });

    models.errorItem.belongsTo(models.items, {
      // as: 'users', //this is not necessary
      through: { model: errorItem },
      targetKey: "id",
      foreignKey: "item_id",
    });
  };
  return errorItem;
};
