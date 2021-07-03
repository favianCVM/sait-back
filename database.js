const mysql = require("mysql");
const dotenv = require("dotenv");

/* init db querys */
const createTableQuerys = require("./utils/querys/createTables");
const populateDatabase = require("./utils/querys/populateDatabase");

dotenv.config();
const { PORT } = process.env;

const { DB_HOST, DB_PASS, DB_USER } = process.env;

///database connection
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  multipleStatements: true,
});

///databse initialization
const initServer = (app) => {
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

              app.listen(PORT, () => {
                console.log(`app's up at ${PORT}`);
                app.use(require("./routes/users"));
                app.use(require("./routes/commons"));
                app.use(require("./routes/incidences"));
              });
            });
          });
        });
      });
    });
  });
};

module.exports = { initServer, connection };
