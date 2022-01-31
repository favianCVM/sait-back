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
              model: models.deviceItem,
              include: {
                model: models.items,
                include: {
                  model: models.itemCategories,
                },
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
              model: models.errorItem,
              include: {
                model: models.items,
                include: {
                  model: models.itemCategories,
                },
              },
            },
          },

          {
            model: models.technicianIncidence,
            where: {
              technician_id: technician.id,
            },
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

        if (!item.technicians.find((el) => el.user?.id === JSON.parse(user_id)))
          return acc;

        item.device.items = item.device.deviceItems.map((el) => ({
          ...el.item,
        }));

        item.errors = item.errors.map((el) => ({
          ...el,
          items: el.errorItems.map((il) => ({ ...il.item })),
        }));

        acc.push(item);
        return acc;
      }, []);

      return resolve(output);
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
};
