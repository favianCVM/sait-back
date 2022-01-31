"use strict";

module.exports = (sequelize, DataTypes) => {
  const items = sequelize.define(
    "items",
    {
      disabled: DataTypes.INTEGER,
      serial: DataTypes.STRING,
      item_category_id: DataTypes.INTEGER,
      assigned: DataTypes.INTEGER
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  items.associate = function (models) {
    // associations can be defined here

    models.items.belongsTo(models.itemCategories, {
      // as: 'users', //this is not necessary
      through: { model: items },
      targetKey: "id",
      foreignKey: "item_category_id",
    });

    models.items.hasMany(models.errorItem);
    models.items.hasMany(models.deviceItem);
  };
  return items;
};
