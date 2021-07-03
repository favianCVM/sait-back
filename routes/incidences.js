const { connection } = require("../database");

const router = require("express").Router();
const { insertIncidenciaUsuario } = require("../utils/querys/insertQuerys");
const { getIncidencias } = require("../utils/querys/getQuerys");

router.post("/incidencia", (req, res) => {
  connection.query(insertIncidenciaUsuario, req.body, (err, data) => {
    console.log(req.body);
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
