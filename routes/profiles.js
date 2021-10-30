const { Router } = require('express')
const { handleError } = require("../utils/index");
const { create_profile, login_profile } = require('../handlers/profile/index')
const {
  ALL,
  ADMIN,
  USER
} = require('../auth/roles')
const AUTH = '../auth'
const app = Router()

app.post(
  '/login',
  async (req, res) => {
    try {
      let profile_logged = await login_profile(req, res)

      if(profile_logged instanceof Error){
        return handleError({
          status: profile_logged.status || 400,
          message: 'Error al login.'
        },{},res)
      }
      
      return res.status(200).json(profile_logged)
    } catch (err) {
      return handleError({
        status: err.status || 500,
        message: err.message || 'Error al login.',
        errorDetail: err.message,
      },{},res)
    }
  }
)

app.post(
  '/create-profile',
  require(AUTH)([ADMIN]),
  async (req, res) => {
    try {
      let profile_created = await create_profile(req)

      if(profile_created instanceof Error){
        return handleError({
          status:  profile_created.status || 500,
          message: profile_created.message || 'Hubo un error al crear el perfil'
        },{},res)
      }
      
      return res.status(200).json(profile_created)
    } catch (err) {

      return handleError({
        status: err.status || 500,
        message: err.message || 'Hubo un error al crear el perfil',
        errorDetail: err.message,
      },{},res)
    }
  }
)

module.exports = app


