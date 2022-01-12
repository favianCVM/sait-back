const models = require('../../models');

module.exports = (req) => {

  return new Promise( async (resolve, reject)=>{
    try {
      let technicians = await models.technicians.findAll({ include: [
        {
          model: models.users,
          required: true,
        }
      ]})
      
      return resolve(technicians)

    } catch (err) {
      return reject(err)
    }
  })
}