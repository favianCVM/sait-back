const init = async () => {
  return `

  DROP TABLE users cascade;
  DROP TABLE technicians cascade;
  DROP TABLE components cascade;
  DROP TABLE devices cascade;
  DROP TABLE errors cascade;
  DROP TABLE incidence_types cascade;
  DROP TABLE device_types cascade;
  DROP TABLE incidences cascade;
  DROP TABLE device_components cascade;
  DROP TABLE device_incidences cascade;
  DROP TABLE error_components cascade;
  DROP TABLE technician_incidences cascade;
  `;
};

module.exports = init;
