const models = require("../../models");

module.exports = (req, res) => {
  const { files, fields: data } = req;

  return new Promise(async (resolve, reject) => {
    try {
      let updated_device = await models.devices.update(
        { ...data },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      if (data.device_type_id === "new") {
        let created_device_type = models.deviceTypes.create({
          ...data,
        });
      }

      //1ST: get the deviceItem table elements
      let deviceItems = await models.deviceItem.findAll({
        where: {
          device_id: req.params.id,
        },
      });

      //2ND: then filter with the request data
      let newItems = JSON.parse(data.items).reduce((acc, item, index) => {
        if (!deviceItems.find((el) => el.dataValues.item_id === item))
          acc.push(item);
        return acc;
      }, []);

      let removeItems = deviceItems.reduce((acc, item, index) => {
        if (
          !JSON.parse(data.items).find((el) => el === item.dataValues.item_id)
        )
          acc.push(item.dataValues.id);

        return acc;
      }, []);

      //3RD: execute the querys with the parameters obtained
      let uploaded_new_items = await models.deviceItem.bulkCreate(
        newItems.map((el) => ({
          device_id: req.params.id,
          item_id: el,
        }))
      );

      let update_new_assigned_items = await models.items.update(
        {
          assigned: 1,
        },
        {
          where: {
            id: newItems,
          },
        }
      );

      let removed_items = await models.deviceItem.destroy({
        where: { id: removeItems },
      });

      let updated_unassigned_items = await models.items.update(
        {
          assigned: 0,
        },
        {
          where: {
            id: removeItems,
          },
        }
      );

      return resolve(updated_device);
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
};
