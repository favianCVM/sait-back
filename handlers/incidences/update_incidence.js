const models = require("../../models");

module.exports = (req, res) => {
  const { files, fields: data } = req;

  console.log("data :", data);
  return new Promise(async (resolve, reject) => {
    try {
      // created incidence
      const updated_incidence = await models.incidences.update(
        {
          ...data,
          end_date: null,
        },
        {
          where: {
            id: data.id,
          },
        }
      );

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
        ...updated_incidence,
      });
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
};
