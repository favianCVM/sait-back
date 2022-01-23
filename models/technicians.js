"use strict";

module.exports = (sequelize, DataTypes) => {
  const technicians = sequelize.define(
    "technicians",
    {
      user_id: {
        field: "user_id",
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  technicians.associate = function (models) {
    // associations can be defined here
    models.technicians.belongsTo(models.users, {
      // as: 'users',
      through: { model: technicians },
      targetKey: "id",
      foreignKey: "user_id",
    });

    models.technicians.hasMany(models.technicianIncidence);
  };
  return technicians;
};
