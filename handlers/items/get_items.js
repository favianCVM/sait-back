const models = require('../../models');

module.exports = (req) => {

  return new Promise( async (resolve, reject)=>{
    try {
      let components = await models.components.findAll()
      
      return resolve(components)

    } catch (err) {
      return reject(err)
    }
  })
}