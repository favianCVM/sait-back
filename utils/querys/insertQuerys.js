const insertIncidenciaUsuario = `INSERT INTO incidencia_usuario SET ?`;

const insertFallaIncidencia = ({ id_falla, id_incidencia }) =>
  `INSERT INTO incidencia_falla(id_falla, id_incidencia) VALUES (${id_falla},${id_incidencia})`;

const insertFallaTecnico = ({ id_tecnico, id_falla }) =>
  `INSERT INTO falla_tecnico(id_tecnico, id_falla) VALUES (${id_tecnico},${id_falla})`;

module.exports = {
  insertIncidenciaUsuario,
  insertFallaIncidencia,
  insertFallaTecnico,
};
