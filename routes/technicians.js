const { Router } = require("express");
const { handleError } = require("../utils/index");
const {
  delete_component,
  update_component,
} = require("../handlers/technicians");
const { get_technicians } = require("../handlers/technicians");
const { ALL, ADMIN, TECHNICIAN } = require("../auth/roles");
const AUTH = "../auth";
const app = Router();

app.get(
  "/get-all-technicians",
  require(AUTH)([ADMIN]),
  async (req, res) => {
    try {
      let technicians = await get_technicians(req);

      if (technicians instanceof Error) {
        return handleError(
          {
            status: technicians.status || 400,
            message: "Error al obtener los tecnicos.",
          },
          {},
          res
        );
      }

      return res.status(200).json(technicians);
    } catch (err) {
      return handleError(
        {
          status: err.status || 500,
          message: err.message || "Error al obtener los tecnicos.",
          errorDetail: err.message,
        },
        {},
        res
      );
    }
  }
);

app.put(
  "/update-component/:id",
  require(AUTH)([ADMIN, TECHNICIAN]),
  async (req, res) => {
    try {
      let updated_component = await update_component(req);

      if (updated_component instanceof Error) {
        return handleError(
          {
            status: updated_component.status || 400,
            message: "Error al actualizar el component.",
          },
          {},
          res
        );
      }

      return res.status(200).json(updated_component);
    } catch (err) {
      return handleError(
        {
          status: err.status || 500,
          message: err.message || "Error al actualizar el component.",
          errorDetail: err.message,
        },
        {},
        res
      );
    }
  }
);

app.delete(
  "/delete-component/:id",
  require(AUTH)([ADMIN, TECHNICIAN]),
  async (req, res) => {
    try {
      let deleted_component = await delete_component(req);

      if (deleted_component instanceof Error) {
        return handleError(
          {
            status: deleted_component.status || 400,
            message: "Error al eliminar el componente.",
          },
          {},
          res
        );
      }

      return res.status(200).json(deleted_component);
    } catch (err) {
      return handleError(
        {
          status: err.status || 500,
          message: err.message || "Error al eliminar el componente.",
          errorDetail: err.message,
        },
        {},
        res
      );
    }
  }
);

module.exports = app;
