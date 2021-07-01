const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

/* init db querys */
const createTableQuerys = require("./utils/querys/createTables");
const populateDatabase = require("./utils/querys/populateDatabase");
/* server and conection */
const connection = require("./database");
const server = express();

dotenv.config();
const { PORT } = process.env;

server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

connection.connect((err) => {
  if (err) throw err;

  connection.query("DROP DATABASE IF EXISTS sait", (err, res) => {
    if (err) throw err;
    console.log("la cochina base de datos fue borrada");

    connection.query("CREATE DATABASE IF NOT EXISTS sait", (err, res) => {
      if (err) throw err;

      connection.query("USE sait", (err, res) => {
        if (err) throw err;
        console.log("DB connected");

        connection.query(createTableQuerys, (err, res) => {
          if (err) throw err;
          console.log("tables initialized");

          connection.query(populateDatabase, (err, res) => {
            if (err) throw err;
            console.log("insertion done!");

            server.listen(PORT, () => {
              console.log(`server's up at ${PORT}`);
            });
          });
        });
      });
    });
  });
});
