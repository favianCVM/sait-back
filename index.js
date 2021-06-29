const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");
const morgan = require("morgan");
const cors = require("cors");

/* init db querys */
const createTableQuerys = require("./utils/querys/createTables");
/* server and conection */
const connection = require("./database");
const { query } = require("./database");
const server = express();

dotenv.config();
const { PORT } = process.env;

server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

connection.connect((err) => {
  if (err) throw err;

  connection.query("CREATE DATABASE IF NOT EXISTS sait", (err, res) => {
    if (err) throw err;

    connection.query("USE sait", (err, res) => {
      if (err) throw err;

      console.log("DB connected");

      connection.query(createTableQuerys, (err, res) => {
        if (err) throw err;
        console.log("tables initialized");

        server.listen(PORT, () => {
          console.log(`server's up at ${PORT}`);
        });
      });
    });
  });
});
