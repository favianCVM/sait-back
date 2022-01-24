const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    const { id: user_id } = req.params;
    try {
      const technician = await models.technicians.findOne({
        raw: true,
        nest: true,
        where: {
          user_id,
        },
      });

      const incidences = await models.incidences.findAll({
        include: [
          {
            model: models.devices,
            required: true,
            include: {
              model: models.deviceComponent,
              include: {
                model: models.components,
              },
            },
          },
          {
            model: models.users,
            required: true,
          },
          {
            model: models.errors,
            include: {
              model: models.errorComponent,
              include: {
                model: models.components,
              },
            },
          },
          {
            model: models.technicianIncidence,
            // where: {
            //   technician_id: technician.id,
            // },
            include: {
              model: models.technicians,
              include: {
                model: models.users,
              },
            },
          },
        ],
      });

      const output = incidences.reduce((acc, item) => {
        item = item.toJSON();

        item.technicians = item.technicianIncidences.map((el) => ({
          ...el.technician,
        }));

        console.log(item.technicians);

        if (!item.technicians.find((el) => el.user?.id === JSON.parse(user_id)))
          return acc;

        item.device.components = item.device.deviceComponents.map((el) => ({
          ...el.component,
        }));

        item.errors = item.errors.map((el) => ({
          ...el,
          components: el.errorComponents.map((il) => ({ ...il.component })),
        }));

        acc.push(item);
        return acc;
      }, []);

      return resolve(output);
    } catch (err) {
      console.error(err);
      return reject(err);
    }
  });
};
