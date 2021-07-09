const insertIncidenciaUsuario = `INSERT INTO incidencia_usuario SET ?`;
const insertTechnicianIncidence = ({
  id_tecnico,
  id_incidencia_usuario,
  estado,
}) => `
INSERT INTO incidencia_tecnico (id_tecnico, id_incidencia_usuario, estado) VALUES ( ${id_tecnico}, ${id_incidencia_usuario}, "${estado}");
`;
module.exports = {
  insertIncidenciaUsuario,
  insertTechnicianIncidence,
};
