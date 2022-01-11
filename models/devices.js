'use strict';

module.exports = (sequelize, DataTypes) => {
  const devices = sequelize.define('devices', {
    user_id: {
      field: 'user_id',
      type: DataTypes.INTEGER,
    },
    serial: {
      field: 'serial',
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false,
    underscored: true,
  });
  devices.associate = function(models) {
    // associations can be defined here
    models.devices.belongsTo(models.users, {
      // as: 'users', 
      through: {model: devices},
      targetKey: 'id',
      foreignKey: 'user_id' 
    })
  };
  return devices;
};