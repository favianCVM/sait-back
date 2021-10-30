const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config()
/**
 * ENVS
 */
const app = express();
const PORT = process.env.PORT || 8000;

/**
 * MIDDLEWARES
 */
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

/**
 * ROUTES
 */
const routes = require('./routes');

app.use(routes);

/**
 * SERVER INIT
 */

const db = require('./connection')

const start = () => {
  db.connect(async (err)=>{
    if(err) throw err;

    let initialQuery = await require('./utils/createTables')()

    db.query(initialQuery, (err) => {
      if(err) throw err;

      console.log("------Data base created ::::")
      app.listen(PORT, (err) => {
        if(err) throw err;

        console.log(`------Server is up on localhost:${PORT}`);
  
        module.exports = app
      });
    })
  })
}

start()

