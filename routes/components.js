const { Router } = require("express");
const { handleError } = require("../utils/index");
const {
  create_component,
  delete_component,
  get_components,
  update_component,
} = require("../handlers/components");
const { ALL, ADMIN, TECHNICIAN } = require("../auth/roles");
const AUTH = "../auth";
const app = Router();

app.post(
  "/create-component",
  require(AUTH)([ADMIN, TECHNICIAN]),
  async (req, res) => {
    try {
      let created_component = await create_component(req);

      if (created_component instanceof Error) {
        return handleError(
          {
            status: created_component.status || 500,
            message:
              created_component.message ||
              "Hubo un error al crear el componente",
          },
          {},
          res
        );
      }

      return res.status(200).json(created_component);
    } catch (err) {
      return handleError(
        {
          status: err.status || 500,
          message: err.message || "Hubo un error al crear el componente",
          errorDetail: err.message,
        },
        {},
        res
      );
    }
  }
);

app.get(
  "/get-all-components",
  require(AUTH)([ADMIN, TECHNICIAN]),
  async (req, res) => {
    try {
      let components = await get_components(req);

      if (components instanceof Error) {
        return handleError(
          {
            status: components.status || 400,
            message: "Error al obtener los componentes.",
          },
          {},
          res
        );
      }

      return res.status(200).json(components);
    } catch (err) {
      return handleError(
        {
          status: err.status || 500,
          message: err.message || "Error al obtener los componentes.",
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
