const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let items = await models.itemCategories.findAll({
        where: {
          disabled: null,
        },
        include: {
          model: models.items,
          where: {
            disabled: null,
          },
        },
      });

      return resolve(items);
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
};
