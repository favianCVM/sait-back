const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

/* app and conection */
const { initServer } = require("./database");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

initServer(app);
