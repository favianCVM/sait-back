const { Router } = require('express')
const { handleError } = require("../utils/index");
const { create_profile, login_profile } = require('../handlers/profile/index')
const {
  ALL,
  ADMIN,
  profile
} = require('../auth/roles')
const AUTH = '../auth'
const app = Router()

app.post(
  '/login',
  async (req, res, next) => {
    try {
      let profileLogged = await login_profile(req, res)

      if(profileLogged instanceof Error){
        return handleError({
          status: 400,
          message: 'algo'
        },{},res)
      }
      
      return res.status(200).json(profileLogged)
    } catch (err) {
      return handleError({
        status: 500,
        message: 'algo',
        errorDetail: err.message,
      },{},res)
    }
  }
)

app.post(
  '/sign-up',
  //require(AUTH)([ALL]),
  async (req, res) => {
    let profileCreated = await create_profile(req)
    
    console.log(profileCreated);
  }
)

module.exports = app


