"use strict";

module.exports = (sequelize, DataTypes) => {
  const itemCategories = sequelize.define(
    "itemCategories",
    {
      //TENGO QUE CAMBIAR EL FORMATO DE LOS FOREING KEY A CAMELCASE
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      picture: DataTypes.STRING,
      picture_id: DataTypes.STRING,
      disabled: DataTypes.INTEGER
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  itemCategories.associate = function (models) {
    // associations can be defined here

    models.itemCategories.hasMany(models.items);
  };
  return itemCategories;
};
