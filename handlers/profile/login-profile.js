const models = require('../../models');
const bcryptjs = require('bcryptjs');
const { createJWToken } = require('../../libs/auth')

module.exports = (req, res) => {
  return new Promise((resolve, reject)=>{
    models.profiles.findOne({where:{
      email: req.body.email,
      password: req.body.password,
    }})
      .then((user)=>{
        if(user === null){
          res.status(401).json({
              message: "Invalid credentials!",
          });
        } else {

          //COMMENT THIST TO WORK WITH ENCRYPTED PASSWORDS
          let token = createJWToken({
            sessionData: {
              ...user
            }
          }) 

          return resolve({
            token,
            ...user
          })

          bcryptjs.compare(req.body.password, user.password, (err, res) => {
            if(res){
              let token = createJWToken({
                sessionData: {
                  ...user
                }
              }) 

              return resolve({
                token,
                ...user
              })
            } else {
              return reject(err)
            }
          })
        }
      })
      .catch((err)=>{
        return reject(err)
      })

  })
}