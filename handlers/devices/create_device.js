const models = require("../../models");

module.exports = (req, res) => {
  const { files, fields: data } = req;

  return new Promise(async (resolve, reject) => {
    try {
      if (data.device_type_id === "new") {
        let created_device_type = await models.deviceTypes.create({
          ...JSON.parse(data.device_type),
        });
        data.device_type_id = created_device_type.dataValues.id;
      }

      let used_serial = await models.devices.findOne({
        where: {
          serial: data.serial,
          device_type_id: data.device_type_id,
        },
      });
      if (used_serial) {
        return res.status(400).json({
          message: "El serial se encuentra registrado.",
        });
      }

      let created_device = await models.devices.create({
        ...data,
      });

      let updated_assigned_items = await models.items.update(
        {
          assigned: 1,
        },
        {
          where: {
            id: JSON.parse(data.items),
          },
        }
      );

      let registered_device_items = await models.deviceItem.bulkCreate(
        JSON.parse(data.items).map((el) => ({
          item_id: el,
          device_id: created_device.dataValues.id,
        }))
      );

      return resolve({ ...created_device, registered_device_items });
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
};
