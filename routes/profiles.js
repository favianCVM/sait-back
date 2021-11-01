const { Router } = require('express')
const { handleError } = require("../utils/index");
const { create_profile, login_profile, get_profiles, update_profile, delete_profile } = require('../handlers/profile/index')
const {
  ALL,
  ADMIN,
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
      let created_profile = await create_profile(req)

      if(created_profile instanceof Error){
        return handleError({
          status:  created_profile.status || 500,
          message: created_profile.message || 'Hubo un error al crear el perfil'
        },{},res)
      }
      
      return res.status(200).json(created_profile)
    } catch (err) {

      return handleError({
        status: err.status || 500,
        message: err.message || 'Hubo un error al crear el perfil',
        errorDetail: err.message,
      },{},res)
    }
  }
)


app.get(
  '/get-all-profiles',
  require(AUTH)([ALL]),
  async (req, res) => {
    try {
      let profiles = await get_profiles(req)

      if(profiles instanceof Error){
        return handleError({
          status: profiles.status || 400,
          message: 'Error al obtener los perfiles.'
        },{},res)
      }
      
      return res.status(200).json(profiles)
    } catch (err) {
      return handleError({
        status: err.status || 500,
        message: err.message || 'Error al login.',
        errorDetail: err.message,
      },{},res)
    }
  }
)


app.put(
  '/update-profile/:id',
  require(AUTH)([ADMIN]),
  async (req, res) => {
    try {
      let updated_profile = await update_profile(req)

      if(updated_profile instanceof Error){
        return handleError({
          status: update_profile.status || 400,
          message: 'Error al actualizar el perfil.'
        },{},res)
      }
      
      return res.status(200).json(updated_profile)
    } catch (err) {
      return handleError({
        status: err.status || 500,
        message: err.message || 'Error al actualizar el perfil.',
        errorDetail: err.message,
      },{},res)
    }
  }
)

app.post(
  '/delete-profile/:id',
  require(AUTH)([ADMIN]),
  async (req, res) => {
    try {
      let deleted_profile = await delete_profile(req)

      if(deleted_profile instanceof Error){
        return handleError({
          status: deleted_profile.status || 400,
          message: 'Error al actualizar el perfil.'
        },{},res)
      }
      
      return res.status(200).json(deleted_profile)
    } catch (err) {
      return handleError({
        status: err.status || 500,
        message: err.message || 'Error al eliminar el perfil.',
        errorDetail: err.message,
      },{},res)
    }
  }
)

module.exports = app


