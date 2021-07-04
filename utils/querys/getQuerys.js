const getUsuarios =
  "SELECT * FROM usuarios INNER JOIN personas ON usuarios.id_persona=personas.id_persona";

const getTecnicos =
  "SELECT * FROM tecnicos INNER JOIN personas ON tecnicos.id_persona=personas.id_persona";

const getIncidenciasUsuarios =
  "SELECT * FROM incidencia_usuario INNER JOIN usuarios ON incidencia_usuario.id_usuario=usuarios.id_usuario";

const getIncidencias = "SELECT * FROM incidencias";

module.exports = {
  getIncidencias,
  getIncidenciasUsuarios,
  getTecnicos,
  getUsuarios,
};
