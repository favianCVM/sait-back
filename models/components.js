"use strict";

module.exports = (sequelize, DataTypes) => {
  const components = sequelize.define(
    "components",
    {
      //TENGO QUE CAMBIAR EL FORMATO DE LOS FOREING KEY A CAMELCASE
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      picture: DataTypes.STRING,
      picture_id: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  components.associate = function (models) {
    // associations can be defined here

    models.components.hasMany(models.errorComponent);
  };
  return components;
};
