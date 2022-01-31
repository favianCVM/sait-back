const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let reincorporated_item = await models.items.update(
        {
          disabled: null,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return resolve(reincorporated_item);
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
};
