const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let disabled_item_category = await models.itemCategories.update(
        {
          disabled: 1,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      let disabled_items = await models.items.update(
        { disabled: 1 },
        {
          returning: true,
          where: {
            item_category_id: req.params.id,
          },
        }
      );

      //creo que si busco todos los items de esa categoria y al tener sus ids puedo mapearlos para borrar las relaciones que tienen con los devices
      let item_id = await models.items.findAll({
        raw: true,
        nest: true,
        where: {
          item_category_id: req.params.id,
        },
      });

      await models.deviceItem.destroy({
        where: {
          item_id: item_id.map((el) => el.id),
        },
      });

      return resolve(disabled_item_category);
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
};
