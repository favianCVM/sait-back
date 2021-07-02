const getUsuarios =
  "SELECT * FROM usuarios INNER JOIN personas ON usuarios.id_persona=personas.id_persona";

const getTecnicos =
  "SELECT * FROM tecnicos INNER JOIN personas ON tecnicos.id_persona=personas.id_persona";

const getFallas = "SELECT * FROM fallas";

const getIncidencias = "SELECT * FROM incidencias";

module.exports = { getFallas, getIncidencias, getTecnicos, getUsuarios };
