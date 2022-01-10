const models = require("../../models");

module.exports = (req, res) => {
  const { files, fields: data } = req;

  return new Promise( async (resolve, reject) => {
    try {
      let updated_device = await models.devices.update(
        { ...data },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return resolve(updated_device)
    } catch (error) {
      return reject(error)
    }
  })

}