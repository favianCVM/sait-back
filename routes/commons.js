const { connection } = require("../database");

const router = require("express").Router();
const { getCategorias, getFallas } = require("../utils/querys/getQuerys");

router.get("/categorias", (req, res) => {
  connection.query(getCategorias, (error, data) => {
    if (error) throw error;
    return res.send(data);
  });
});

router.get("/fallas", (req, res) => {
  connection.query(getFallas, (error, data) => {
    if (error) throw error;
    return res.send(data);
  });
});

module.exports = router;
