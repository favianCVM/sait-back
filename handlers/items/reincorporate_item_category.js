const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let reincorporated_item_category = await models.itemCategories.update(
        {
          disabled: null,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return resolve(reincorporated_item_category);
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
};
