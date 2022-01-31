const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let disabled_item = await models.items.update(
        {
          disabled: 1,
          assigned: null,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      await models.deviceItem.destroy({
        where: {
          item_id: req.params.id,
        },
      });

      return resolve(disabled_item);
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
};
