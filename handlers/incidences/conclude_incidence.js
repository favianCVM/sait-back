const models = require("../../models");
const { uploadImage } = require("../../utils/imageHandler");

module.exports = (req, res) => {
  const { files, fields: data } = req;

  console.log(data);

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

      let incidence_errors = await models.errors.bulkCreate(
        {
          ...JSON.parse(errors),
        },
        {
          raw: true,
          nest: true,
        }
      );

      console.log('incidence_errors :', incidence_errors);

      // let error_components = await models.errors.bulkCreate(
      //   {},
      //   {
      //     raw: true,
      //     nest: true,
      //   }
      // );

      return resolve(concluded_incidence);
    } catch (error) {
      return reject(error);
    }
  });
};
