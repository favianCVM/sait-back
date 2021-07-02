const { connection } = require("../database");

const router = require("express").Router();
const { getUsuarios, getTecnicos } = require("../utils/querys/getQuerys");

router.get("/usuarios", (req, res) => {
  connection.query(getUsuarios, (error, data) => {
    if (error) throw error;
    console.log(data);
  });
});

router.get("/tecnicos", (req, res) => {
  connection.query(getTecnicos, (error, data) => {
    if (error) throw error;
    console.log(data);
  });
});

module.exports = router;
