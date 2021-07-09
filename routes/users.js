const { connection } = require("../database");

const router = require("express").Router();
const {
  getUsuarios,
  getTecnicos,
  getUsuario,
} = require("../utils/querys/getQuerys");

router.get("/usuarios", (req, res) => {
  connection.query(getUsuarios, (error, data) => {
    if (error) throw error;
    res.send(data);
  });
});

router.get("/usuario/:id", (req, res) => {
  connection.query(getUsuario(req.params.id), (err, data) => {
    if (err) throw err;

    connection.query(
      `SELECT * FROM personas WHERE id_persona = ${data[0].id_persona}`,
      (err, data) => {
        if (err) throw err;

        res.send(data[0]);
      }
    );
  });
});

router.get("/tecnicos", (req, res) => {
  connection.query(getTecnicos, (error, data) => {
    if (error) throw error;
    res.send(data);
  });
});

module.exports = router;
