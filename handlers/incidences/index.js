const create_incidence = require("./create_incidence");
const get_user_incidences = require("./get_user_incidences");
const update_incidence = require("./update_incidence");
const get_all_incidences = require("./get_all_incidences");
const resolve_incidence = require("./resolve_incidence");
const conclude_incidence = require("./conclude_incidence");
const get_incidence = require("./get_incidence");
const asign_technician = require("./asign_technician");

module.exports = {
  create_incidence,
  get_all_incidences,
  get_user_incidences,
  update_incidence,
  resolve_incidence,
  conclude_incidence,
  get_incidence,
  asign_technician,
};
