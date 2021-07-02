const { connection } = require("../database");

const router = require("express").Router();
const { getCategorias, getFallas } = require("../utils/querys/getQuerys");

router.get("/categorias", (req, res) => {
  connection.query(getCategorias, (error, data) => {
    if (error) throw error;
    console.log(data);
  });
});

router.get("/fallas", () => {
  connection.query(getFallas, (error, data) => {
    if (error) throw error;
    console.log(data);
  });
});

module.exports = router;
