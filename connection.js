const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

var client = {};

if (process.env.NODE_ENV === "production")
  client = new pg.Client(process.env.DB_URL);
else if (process.env.NODE_ENV === "development")
  client = new pg.Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

module.exports = client;
