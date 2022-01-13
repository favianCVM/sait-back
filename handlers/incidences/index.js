const create_incidence = require('./create_incidence')
const get_user_incidences = require('./get_user_incidences')
const update_incidence = require('./update_incidence')
const get_incidences = require('./get_incidences')
const get_incidence_types = require('./get_incidence_types')

module.exports = {
  create_incidence,
  get_incidences,
  get_user_incidences,
  update_incidence,
  get_incidence_types,
}