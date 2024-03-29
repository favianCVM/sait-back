require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const formidable = require("express-formidable");
dotenv.config();
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
app.use(formidable());
/**
 * ROUTES
 */
const routes = require("./routes");

app.use(routes);

/**
 * SERVER INIT
 */

const db = require("./connection");

const start = async () => {
  db.connect(async (err) => {
    if (err) throw err;

    console.log("=>>>>>>>>>> db connected");

    try {
      // await require("./utils/initializeTables")();
    } catch (err) {
      throw err;
    }
  });

  app.listen(PORT, async (err) => {
    if (err) throw err;

    console.log(`------Server is up on localhost:${PORT}`);

    module.exports = app;
  });

  // app.listen(PORT, async (err) => {
  //   if (err) throw err;

  //   try {
  //     await require('./utils/initializeUsers')()
  //   } catch (error) {
  //     setTimeout(start, 5000)
  //   }

  //   console.log("=>>>>>>>>>>> node env", process.env.NODE_ENV);

  //   console.log(`------Server is up on localhost:${PORT}`);

  //   module.exports = app;
  // });
};

start();
