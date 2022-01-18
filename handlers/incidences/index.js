const create_incidence = require("./create_incidence");
const get_user_incidences = require("./get_user_incidences");
const update_incidence = require("./update_incidence");
const get_all_incidences = require("./get_all_incidences");
const get_incidence_types = require("./get_incidence_types");
const resolve_incidence = require("./resolve_incidence");

module.exports = {
  create_incidence,
  get_all_incidences,
  get_user_incidences,
  update_incidence,
  get_incidence_types,
  resolve_incidence,
};
