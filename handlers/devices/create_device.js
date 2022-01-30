const models = require("../../models");

module.exports = (req, res) => {
  const { files, fields: data } = req;

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

      let registered_device_items = await models.deviceItem.bulkCreate(
        JSON.parse(data.components).map((el) => ({
          item_id: el,
          device_id: created_device.dataValues.id,
        }))
      );

      return resolve({ ...created_device, registered_device_items });
    } catch (error) {
      return reject(error);
    }
  });
};
