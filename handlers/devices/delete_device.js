const models = require('../../models');

module.exports = (req) => {
  return new Promise( async (resolve, reject) => {
    try {
      let deleted_device = await models.devices.destroy({
        where: {
          id: req.params.id
        }
      })

      return resolve(deleted_device)
      
    } catch (error) {
      return reject(error)      
    }
  })
}