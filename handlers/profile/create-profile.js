const models = require('../../models');
const bcrypt = require('bcryptjs');

module.exports = async (req) => {
  const data = req.body;

  return new Promise(async (resolve, reject) => {
    try {
      let usedDni = await models.profiles.findOne({
        where:{
          dni: data.dni,
        } 
      })
  
      if(usedDni) return reject({status: 400 , message: 'Este dni se encuentra en uso.'})
  
      let usedEmail = await models.profiles.findOne({
        where:{
          email: data.email,
        } 
      })
  
      if(usedEmail) return reject({status: 400 , message: 'Este email se encuentra en uso.'})
      
      let salt = await bcrypt.genSalt(15);
      let hashedPass = await bcrypt.hash(data.password, salt);
    
      data.password = hashedPass
    
      let created_profile = await models.profiles.create({...data})
      
      return resolve(created_profile)
      
    } catch (err ) {
      return reject(err)
    }
  })


}
