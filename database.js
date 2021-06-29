const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const { DB_HOST, DB_PASS, DB_USER } = process.env;

///database connection
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  multipleStatements: true,
});

module.exports = connection;
