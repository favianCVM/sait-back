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

      //1ST: get the deviceComponent table elements
      let deviceComponents = await models.deviceComponent.findAll({
        where: {
          device_id: req.params.id,
        },
      });

      //2ND: then filter with the request data
      let newComponents = JSON.parse(data.components).reduce(
        (acc, item, index) => {
          if (
            !deviceComponents.find((el) => el.dataValues.component_id === item)
          )
            acc.push(item);
          return acc;
        },
        []
      );

      let removeComponents = deviceComponents.reduce((acc, item, index) => {
        if (
          !JSON.parse(data.components).find(
            (el) => el === item.dataValues.component_id
          )
        )
          acc.push(item.dataValues.id);

        return acc;
      }, []);

      //3RD: execute the querys with the parameters obtained
      let uploaded_new_components = await models.deviceComponent.bulkCreate(
        newComponents.map((el) => ({
          device_id: req.params.id,
          component_id: el,
        }))
      );

      let removed_components = await models.deviceComponent.destroy({
        where: { id: removeComponents },
      });


      return resolve(updated_device);
    } catch (error) {
      return reject(error);
    }
  });
};
