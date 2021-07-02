const getUsuarios =
  "SELECT * FROM usuarios INNER JOIN personas ON usuarios.id_persona=personas.id_persona";

const getTecnicos =
  "SELECT * FROM tecnicos INNER JOIN personas ON tecnicos.id_persona=personas.id_persona";

const getCategorias = "SELECT * FROM categorias";

const getFallas = "SELECT * FROM fallas";

const getIncidencias =
  "SELECT * FROM incidencia_usuario INNER JOIN usuarios ON incidencia_usuario.id_usuario=usuarios.id_usuario";

module.exports = {
  getFallas,
  getIncidencias,
  getTecnicos,
  getUsuarios,
  getCategorias,
};
