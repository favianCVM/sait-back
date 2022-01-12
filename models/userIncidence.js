"use strict";

module.exports = (sequelize, DataTypes) => {
  const userIncidence = sequelize.define(
    "userIncidence",
    {
      user_id: DataTypes.INTEGER,
      incidence_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  userIncidence.associate = function (models) {
    // associations can be defined here

    models.userIncidence.belongsTo(models.users, {
      // as: 'users', //this is not necessary
      through: { model: userIncidence },
      targetKey: "id",
      foreignKey: "user_id",
    });

    models.userIncidence.belongsTo(models.incidences, {
      // as: 'users', //this is not necessary
      through: { model: userIncidence },
      targetKey: "id",
      foreignKey: "incidence_id",
    });
  };
  return userIncidence;
};
