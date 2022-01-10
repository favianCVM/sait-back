const models = require("../../models");

module.exports = (req, res) => {
  const { files, fields: data } = req;

  return new Promise( async (resolve, reject) => {
    try {
      let created_device = await models.devices.create({
        ...data
      })

      return resolve(created_device)
    } catch (error) {
      return reject(error)
    }
  })

}