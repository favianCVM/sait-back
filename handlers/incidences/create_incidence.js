const models = require("../../models");
const { uploadImage } = require("../../utils/imageHandler");

module.exports = (req, res) => {
  const { files, fields: data } = req;

  return new Promise(async (resolve, reject) => {
    try {
      // created incidence
      const created_incidence = await models.incidences.create({
        ...data,
      });

      // if there's errors it creates
      // if (JSON.parse(data.errors).length) {
      //   created_errors = await models.errors.bulkCreate(
      //     JSON.parse(data.errors)
      //   );

      //   // incidence-error relation
      //   created_incidenceErrors = await models.incidenceError.bulkCreate(
      //     created_errors.map((el) => ({
      //       incidence_id: created_incidence.dataValues.id,
      //       error_id: el.dataValues.id,
      //     }))
      //   );
      // }

      // device-incidence relation
      // created_deviceIncidence = await models.deviceIncidence.create({
      //   device_id: data.device_id,
      //   incidence_id: created_incidence.dataValues.id,
      // });

      return resolve({
        ...created_incidence,
      });
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
};
