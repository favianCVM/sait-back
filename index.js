const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2');

/**
 * ENVS
 */
const app = express();
const PORT = process.env.APP_PORT || 8000;

/**
 * MIDDLEWARES
 */
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

/**
 * DB OBJECT
 */
const db_connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * ROUTES
 */
const routes = require('./routes');

app.use(routes);

/**
 * SERVER INIT
 */

const start = () => {
  db_connection.connect((err)=>{
    if(err){
      start()
      throw err;
    }

    db_connection.query(require('./utils/createTables'), (err) => {
      if(err){
        start()
        throw err;
      }

      app.listen(PORT, (err) => {
        if(err){
          start()
          throw err;
        }
        console.log(`------Server is up on localhost:${PORT}`);
  
        module.exports = {db_connection, app}
      });
    })
  })
}

start()

