const models = require("../../models");
const { uploadImage } = require("../../utils/imageHandler");

module.exports = (req, res) => {
  const { files, fields: data } = req;

  return new Promise(async (resolve, reject) => {
    try {
      let created_errors,
        created_incidenceErrors = [];

      let created_type,
        created_incidence,
        created_userIncidence = {};

      if (data.type_id === "new") {
        created_type = await models.types.create({
          ...JSON.parse(data.type),
        });
        data.type_id = created_type.dataValues.id;
      }

      created_incidence = await models.incidences.create({
        description: data.description,
        type_id: data.type_id,
      });

      created_userIncidence = await models.userIncidence.create({
        user_id: data.user_id,
        incidence_id: created_incidence.dataValues.id,
      });

      if (JSON.parse(data.errors).length) {
        created_errors = await models.errors.bulkCreate(
          JSON.parse(data.errors)
        );

        created_incidenceErrors = await models.incidenceError.bulkCreate(
          created_errors.map((el) => ({
            incidence_id: created_incidence.dataValues.id,
            error_id: el.dataValues.id,
          }))
        );
      }

      return resolve({
        ...created_incidence,
      });
    } catch (error) {
      return reject(error);
    }
  });
};
