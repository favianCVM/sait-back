const { connection } = require("../database");

const router = require("express").Router();
const {
  insertIncidenciaUsuario,
  insertTechnicianIncidence,
} = require("../utils/querys/insertQuerys");

const {
  getIncidencias,
  getIncidenciasUsuarios,
} = require("../utils/querys/getQuerys");

router.post("/incidencia", (req, res) => {
  connection.query(insertIncidenciaUsuario, req.body, (err, data) => {
    if (err) throw err;
    return res.send(data);
  });
});

router.post("/asignar-tecnico", (req, res) => {
  connection.query(insertTechnicianIncidence(req.body), (err, data) => {
    if (err) throw err;
    return res.send(data);
  });
});

router.put("/incidencia/:id_incidencia", (req, res) => {
  connection.query(
    `UPDATE incidencia_usuario SET estado = 'cerrada', comentario = "${req.body.comentario}" WHERE id_incidencia_usuario = ${req.params.id_incidencia}`,
    (err, datares) => {
      if (err) throw err;

      res.send(datares);
    }
  );
});

router.get("/incidencia-usuario/:id", (req, res) => {
  connection.query(
    `SELECT * FROM incidencia_usuario INNER JOIN incidencias ON incidencias.id_incidencia=incidencia_usuario.id_incidencia WHERE incidencia_usuario.id_incidencia_usuario=${req.params.id}`,
    (err, data1) => {
      if (err) throw err;

      connection.query(
        `SELECT * FROM usuarios INNER JOIN personas ON personas.id_persona=usuarios.id_persona WHERE usuarios.id_usuario=${data1[0].id_usuario}`,
        (err, data2) => {
          if (err) throw err;

          connection.query(
            `SELECT * FROM incidencia_tecnico INNER JOIN tecnicos ON incidencia_tecnico.id_tecnico=tecnicos.id_tecnico INNER JOIN personas ON personas.id_persona=tecnicos.id_persona WHERE incidencia_tecnico.id_incidencia_usuario=${data1[0].id_incidencia_usuario}`,
            (err, data3) => {
              if (err) throw err;

              return res.send({
                incidencia: data1[0],
                usuario: data2[0],
                tecnico: data3[0],
              });
            }
          );
        }
      );
    }
  );
});

router.get("/incidencias-usuarios", (req, res) => {
  connection.query(getIncidenciasUsuarios, (err, data) => {
    if (err) throw err;

    return res.send(data);
  });
});

router.get("/incidencias", (req, res) => {
  connection.query(getIncidencias, (err, data) => {
    if (err) throw err;
    return res.send(data);
  });
});

module.exports = router;
