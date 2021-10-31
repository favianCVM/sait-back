const models = require('../../models');

module.exports = (req) => {

  return new Promise( async (resolve, reject)=>{
    try {
      let profiles = await models.profiles.findAll()

      
      profiles = profiles.map((profileData)=> {
        delete profileData.dataValues.password

        return {...profileData.dataValues}
      })
      
      return resolve(profiles)

    } catch (err) {
      return reject(err)
    }
  })
}