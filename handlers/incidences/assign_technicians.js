const models = require("../../models");

module.exports = (req, res) => {
  const { files, fields: data } = req;

  return new Promise(async (resolve, reject) => {
    try {
      const { technicians, id: incidence_id } = data;

      //1ST: get the technicianIncidence table elements
      const technicianIncidences = await models.technicianIncidence.findAll({
        where: {
          incidence_id,
        },
        raw: true,
      });

      //2ND: then filter with the request data
      const newTechnicians = JSON.parse(technicians).filter(
        (el) => !technicianIncidences.find((il) => il.technician_id === el)
      );

      const removedTechnicians = technicianIncidences
        .filter(
          (el) => !JSON.parse(technicians).find((il) => il === el.technician_id)
        )
        .map((el) => el.id);

      //3RD: execute the querys with the parameters obtained

      let technician_assigned = await models.technicianIncidence.bulkCreate(
        newTechnicians.map((el) => ({
          technician_id: el,
          incidence_id: incidence_id,
        }))
      );

      let technician_removed = await models.technicianIncidence.destroy({
        where: { id: removedTechnicians },
      });

      return resolve({
        technician_assigned,
        technician_removed,
      });
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
};
