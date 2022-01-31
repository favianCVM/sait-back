const models = require("../../models");
const { uploadImage } = require("../../utils/imageHandler");

module.exports = (req, res) => {
  const { files, fields: data } = req;

  return new Promise(async (resolve, reject) => {
    const { end_date, errors, technician_id } = data;
    const { id: incidence_id } = req.params;

    try {
      let concluded_incidence = await models.incidences.update(
        {
          status: "succeeded",
          end_date: end_date,
        },
        {
          where: {
            id: incidence_id,
          },
        }
      );

      let created_errors = await models.errors.bulkCreate(
        JSON.parse(errors).map((el) => ({ ...el, incidence_id }))
      );

      const errorItemsData = created_errors.reduce((acc, item, index) => {
        item.toJSON();

        let output = JSON.parse(errors)[index].items.map((el) => ({
          item_id: el,
          error_id: item.id,
        }));

        acc = [...acc, ...output];

        return acc;
      }, []);

      let error_items = await models.errorItem.bulkCreate(
        errorItemsData
      )

      return resolve(concluded_incidence);
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
};
