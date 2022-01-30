const models = require('../../models');

module.exports = (req) => {
  return new Promise( async (resolve, reject) => {
    try {
      let deleted_component = await models.components.destroy({
        where: {
          id: req.params.id
        }
      })

      return resolve(deleted_component)
      
    } catch (error) {
      return reject(error)      
    }
  })
}