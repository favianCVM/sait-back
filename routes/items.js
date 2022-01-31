const { Router } = require("express");
const { handleError } = require("../utils/index");
const {
  disable_item,
  disable_item_category,
  get_items,
  register_item,
  register_item_category,
  get_available_items,
  reincorporate_item,
  reincorporate_item_category,
} = require("../handlers/items");
const { ALL, ADMIN, TECHNICIAN } = require("../auth/roles");
const AUTH = "../auth";
const app = Router();

app.post(
  "/register-item",
  require(AUTH)([ADMIN, TECHNICIAN]),
  async (req, res) => {
    try {
      let registered_item = await register_item(req, res);

      if (registered_item instanceof Error) {
        return handleError(
          {
            status: registered_item.status || 500,
            message:
              registered_item.message ||
              "Hubo un error al registrar el elemento",
          },
          {},
          res
        );
      }

      return res.status(200).json(registered_item);
    } catch (err) {
      return handleError(
        {
          status: err.status || 500,
          message: err.message || "Hubo un error al registrar el elemento",
          errorDetail: err.message,
        },
        {},
        res
      );
    }
  }
);

app.post(
  "/register-item-category",
  require(AUTH)([ADMIN, TECHNICIAN]),
  async (req, res) => {
    try {
      let registered_item_category = await register_item_category(req);

      if (registered_item_category instanceof Error) {
        return handleError(
          {
            status: registered_item_category.status || 500,
            message:
              registered_item_category.message ||
              "Hubo un error al registrar la categoria",
          },
          {},
          res
        );
      }

      return res.status(200).json(registered_item_category);
    } catch (err) {
      return handleError(
        {
          status: err.status || 500,
          message: err.message || "Hubo un error al registrar la categoria",
          errorDetail: err.message,
        },
        {},
        res
      );
    }
  }
);

app.get(
  "/get-all-items",
  require(AUTH)([ADMIN, TECHNICIAN]),
  async (req, res) => {
    try {
      let items = await get_items(req);

      if (items instanceof Error) {
        return handleError(
          {
            status: items.status || 400,
            message: "Error al obtener los elementos.",
          },
          {},
          res
        );
      }

      return res.status(200).json(items);
    } catch (err) {
      return handleError(
        {
          status: err.status || 500,
          message: err.message || "Error al obtener los elementos.",
          errorDetail: err.message,
        },
        {},
        res
      );
    }
  }
);

app.get(
  "/get-available-items",
  require(AUTH)([ADMIN, TECHNICIAN]),
  async (req, res) => {
    try {
      let items = await get_available_items(req);

      if (items instanceof Error) {
        return handleError(
          {
            status: items.status || 400,
            message: "Error al obtener los elementos.",
          },
          {},
          res
        );
      }

      return res.status(200).json(items);
    } catch (err) {
      return handleError(
        {
          status: err.status || 500,
          message: err.message || "Error al obtener los elementos.",
          errorDetail: err.message,
        },
        {},
        res
      );
    }
  }
);

app.delete(
  "/disable-item/:id",
  require(AUTH)([ADMIN, TECHNICIAN]),
  async (req, res) => {
    try {
      let disabled_item = await disable_item(req);

      if (disabled_item instanceof Error) {
        return handleError(
          {
            status: disabled_item.status || 400,
            message: "Error al eliminar el componente.",
          },
          {},
          res
        );
      }

      return res.status(200).json(disabled_item);
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

app.delete(
  "/disable-item-category/:id",
  require(AUTH)([ADMIN, TECHNICIAN]),
  async (req, res) => {
    try {
      let disabled_category = await disable_item_category(req);

      if (disabled_category instanceof Error) {
        return handleError(
          {
            status: disabled_category.status || 400,
            message: "Error al eliminar el componente.",
          },
          {},
          res
        );
      }

      return res.status(200).json(disabled_category);
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

app.post(
  "/reincorporate-item/:id",
  require(AUTH)([ADMIN, TECHNICIAN]),
  async (req, res) => {
    try {
      let reincorporated_item = await reincorporate_item(req);

      if (reincorporated_item instanceof Error) {
        return handleError(
          {
            status: reincorporated_item.status || 400,
            message: "Error al reincorporar el elemento.",
          },
          {},
          res
        );
      }

      return res.status(200).json(reincorporated_item);
    } catch (err) {
      return handleError(
        {
          status: err.status || 500,
          message: err.message || "Error al eliminar el elemento.",
          errorDetail: err.message,
        },
        {},
        res
      );
    }
  }
);

app.post(
  "/reincorporate-item-category/:id",
  require(AUTH)([ADMIN, TECHNICIAN]),
  async (req, res) => {
    try {
      let reincorporated_item_category = await reincorporate_item_category(req);

      if (reincorporated_item_category instanceof Error) {
        return handleError(
          {
            status: reincorporated_item_category.status || 400,
            message: "Error al reincorporar el elemento.",
          },
          {},
          res
        );
      }

      return res.status(200).json(reincorporated_item_category);
    } catch (err) {
      return handleError(
        {
          status: err.status || 500,
          message: err.message || "Error al reincorporar el elemento.",
          errorDetail: err.message,
        },
        {},
        res
      );
    }
  }
);

module.exports = app;
