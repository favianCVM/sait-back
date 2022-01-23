const { Router } = require("express");
const { handleError } = require("../utils/index");
const {
  create_incidence,
  get_incidence_types,
  get_all_incidences,
  get_incidence,
  assign_technicians,
  conclude_incidence,
  get_user_incidences,
  get_technician_incidences,
  update_incidence,
} = require("../handlers/incidences");
const { ALL, ADMIN, TECHNICIAN, USER } = require("../auth/roles");
const AUTH = "../auth";
const app = Router();

app.post("/create-incidence", require(AUTH)([ALL]), async (req, res) => {
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

app.get("/incidence-types", require(AUTH)([ALL]), async (req, res) => {
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

app.get(
  "/get-all-incidences",
  require(AUTH)([ADMIN, TECHNICIAN]),
  async (req, res) => {
    try {
      let incidences = await get_all_incidences(req, res);

      if (incidences instanceof Error) {
        return handleError(
          {
            status: incidence_types.status || 400,
            message: "Error al obtener las incidencias.",
          },
          {},
          res
        );
      }

      return res.status(200).json(incidences);
    } catch (err) {
      return handleError(
        {
          status: err.status || 500,
          message: err.message || "Error al obtener las incidencias.",
          errorDetail: err.message,
        },
        {},
        res
      );
    }
  }
);

app.get("/get-incidence/:id", require(AUTH)([ALL]), async (req, res) => {
  try {
    let incidences = await get_incidence(req, res);

    if (incidences instanceof Error) {
      return handleError(
        {
          status: incidence_types.status || 400,
          message: "Error al obtener la incidencia.",
        },
        {},
        res
      );
    }

    return res.status(200).json(incidences);
  } catch (err) {
    return handleError(
      {
        status: err.status || 500,
        message: err.message || "Error al obtener la incidencia.",
        errorDetail: err.message,
      },
      {},
      res
    );
  }
});

app.post("/assign-technicians", require(AUTH)([ADMIN]), async (req, res) => {
  try {
    let assigned_technicians = await assign_technicians(req, res);

    if (assigned_technicians instanceof Error) {
      return handleError(
        {
          status: assigned_technicians.status || 400,
          message: "Error al asignar los técnicos.",
        },
        {},
        res
      );
    }

    return res.status(200).json(assigned_technicians);
  } catch (err) {
    return handleError(
      {
        status: err.status || 500,
        message: err.message || "Error al asignar los técnicos.",
        errorDetail: err.message,
      },
      {},
      res
    );
  }
});

app.put("/update-incidence/:id", require(AUTH)([ALL]), async (req, res) => {
  try {
    let changed_incidence = await update_incidence(req, res);

    if (changed_incidence instanceof Error) {
      return handleError(
        {
          status: changed_incidence.status || 400,
          message: "Error al actualizar la incidencia.",
        },
        {},
        res
      );
    }

    return res.status(200).json(changed_incidence);
  } catch (err) {
    return handleError(
      {
        status: err.status || 500,
        message: err.message || "Error al actualizar la incidencia.",
        errorDetail: err.message,
      },
      {},
      res
    );
  }
});

app.get(
  "/get-technician-incidences/:id",
  require(AUTH)([ADMIN, TECHNICIAN]),
  async (req, res) => {
    try {
      let incidences = await get_technician_incidences(req, res);

      if (incidences instanceof Error) {
        return handleError(
          {
            status: incidence_types.status || 400,
            message: "Error al obtener las incidencias.",
          },
          {},
          res
        );
      }

      return res.status(200).json(incidences);
    } catch (err) {
      return handleError(
        {
          status: err.status || 500,
          message: err.message || "Error al obtener las incidencias.",
          errorDetail: err.message,
        },
        {},
        res
      );
    }
  }
);

app.get("/get-user-incidences/:id", require(AUTH)([ALL]), async (req, res) => {
  try {
    let incidences = await get_user_incidences(req, res);

    if (incidences instanceof Error) {
      return handleError(
        {
          status: incidence_types.status || 400,
          message: "Error al obtener las incidencias.",
        },
        {},
        res
      );
    }

    return res.status(200).json(incidences);
  } catch (err) {
    return handleError(
      {
        status: err.status || 500,
        message: err.message || "Error al obtener las incidencias.",
        errorDetail: err.message,
      },
      {},
      res
    );
  }
});

app.post(
  "/conclude-incidence/:id",
  require(AUTH)([TECHNICIAN]),
  async (req, res) => {
    try {
      let concluded_incindence = await conclude_incidence(req, res);

      if (concluded_incindence instanceof Error) {
        return handleError(
          {
            status: concluded_incindence.status || 400,
            message: "Error al concluir la incidencia.",
          },
          {},
          res
        );
      }

      return res.status(200).json(concluded_incindence);
    } catch (err) {
      return handleError(
        {
          status: err.status || 500,
          message: err.message || "Error al concluir la incidencia.",
          errorDetail: err.message,
        },
        {},
        res
      );
    }
  }
);

module.exports = app;
