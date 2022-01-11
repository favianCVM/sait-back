'use strict';

module.exports = (sequelize, DataTypes) => {
  const deviceComponent = sequelize.define('deviceComponent', {
    device_id: DataTypes.INTEGER,
    component_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    underscored: true,
  });
  deviceComponent.associate = function(models) {
    // associations can be defined here

    models.deviceComponent.belongsTo(models.devices, {
      // as: 'users', //this is not necessary 
      through: {model: deviceComponent},
      targetKey: 'id',
      foreignKey: 'device_id' 
    })

    models.deviceComponent.belongsTo(models.components, {
      // as: 'users', //this is not necessary 
      through: {model: deviceComponent},
      targetKey: 'id',
      foreignKey: 'component_id' 
    })

  };
  return deviceComponent;
};