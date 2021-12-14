const models = require('../../models');
const bcrypt = require('bcryptjs');
const { uploadImage } = require('../../utils/imageHandler')

module.exports = async (req) => {
  const data = req.fields;
  console.log('form data =>>>>', data)

  return new Promise(async (resolve, reject) => {
    try {
      let usedDni = await models.users.findOne({
        where:{
          dni: data.dni,
        } 
      })
  
      if(usedDni) return reject({status: 400 , message: 'Este dni se encuentra en uso.'})
  
      let usedEmail = await models.users.findOne({
        where:{
          email: data.email,
        } 
      })
  
      if(usedEmail) return reject({status: 400 , message: 'Este email se encuentra en uso.'})
      
      let salt = await bcrypt.genSalt(15);
      let hashedPass = await bcrypt.hash(data.password, salt);
    
      data.password = hashedPass
    
      if(data.image) await uploadImage({
        folder: process.env.CLOUDINARY_USERS_FOLDER,
        picture: data.image,
      })
      
      let created_user = await models.users.create({...data})

      return resolve(created_user)
      
    } catch (err ) {
      return reject(err)
    }
  })


}
