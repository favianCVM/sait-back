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
  connection.query(insertTechnicianIncidence, req.body, (err, data) => {
    if (err) throw err;
    return res.send(data);
  });
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
