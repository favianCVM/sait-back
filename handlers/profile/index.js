const create_profile = require('./create-profile'); 
const login_profile = require('./login-profile'); 
const get_profiles = require('./get-profiles'); 
const update_profile = require('./update-profile'); 
const delete_profile = require('./delete-profile'); 

module.exports = {
  get_profiles,
  create_profile,
  login_profile,
  update_profile,
  delete_profile,
} 