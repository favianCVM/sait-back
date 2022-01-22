const models = require("../../models");

module.exports = (req, res) => {
  const { files, fields: data } = req;

  console.log(data);
  return new Promise(async (resolve, reject) => {
    try {
      if (data.deviceTypeId === "new") {
        let created_device_type = await models.deviceTypes.create({
          ...JSON.parse(data.deviceType),
        });
        data.deviceTypeId = created_device_type.dataValues.id;
      }

      let created_device = await models.devices.create({
        ...data,
      });

      let created_deviceComponent = await models.deviceComponent.bulkCreate(
        JSON.parse(data.components).map((el) => ({
          component_id: el,
          device_id: created_device.dataValues.id,
        }))
      );

      return resolve({ ...created_device, created_deviceComponent });
    } catch (error) {
      return reject(error);
    }
  });
};
