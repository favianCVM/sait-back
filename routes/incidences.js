const { Router } = require("express");
const { handleError } = require("../utils/index");
const { create_incidence, get_incidence_types } = require("../handlers/incidences");
const { ALL, ADMIN, TECHNICIAN, USER } = require("../auth/roles");
const AUTH = "../auth";
const app = Router();

app.post("/create-incidence", require(AUTH)([ADMIN, ALL]), async (req, res) => {
  try {
    let incidence_types = await create_incidence(req, res);

    if (incidence_types instanceof Error) {
      return handleError(
        {
          status: incidence_types.status || 400,
          message: "Error al crear la incidencia.",
        },
        {},
        res
      );
    }

    return res.status(200).json(incidence_types);
  } catch (err) {
    return handleError(
      {
        status: err.status || 500,
        message: err.message || "Error al crear el equipo.",
        errorDetail: err.message,
      },
      {},
      res
    );
  }
});


app.get("/incidence-types", require(AUTH)([ADMIN, ALL]), async (req, res) => {
  try {
    let incidence_types = await get_incidence_types(req, res);

    if (incidence_types instanceof Error) {
      return handleError(
        {
          status: incidence_types.status || 400,
          message: "Error al obtener los tipos de incidencias.",
        },
        {},
        res
      );
    }

    return res.status(200).json(incidence_types);
  } catch (err) {
    return handleError(
      {
        status: err.status || 500,
        message: err.message || "Error al obtener los tipos de incidencias.",
        errorDetail: err.message,
      },
      {},
      res
    );
  }
});

module.exports = app;
