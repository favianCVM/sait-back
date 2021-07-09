const getUsuarios =
  "SELECT * FROM usuarios INNER JOIN personas ON usuarios.id_persona=personas.id_persona";

const getTecnicos =
  "SELECT * FROM tecnicos INNER JOIN personas ON tecnicos.id_persona=personas.id_persona";

const getIncidenciasUsuarios =
  "SELECT * FROM incidencia_usuario INNER JOIN usuarios ON incidencia_usuario.id_usuario=usuarios.id_usuario INNER JOIN personas ON usuarios.id_persona=personas.id_persona INNER JOIN incidencias ON incidencia_usuario.id_incidencia=incidencias.id_incidencia ;";

const getIncidencias = "SELECT * FROM incidencias";

const getUsuario = (id) => `SELECT * FROM usuarios WHERE id_usuario = ${id}`;

module.exports = {
  getUsuario,
  getIncidencias,
  getIncidenciasUsuarios,
  getTecnicos,
  getUsuarios,
};
