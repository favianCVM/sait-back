const models = require('../../models');

module.exports = (req) => {

  return new Promise( async (resolve, reject)=>{
    try {
      let types = await models.deviceTypes.findAll()

      return resolve(types)

    } catch (err) {
      return reject(err)
    }
  })
}