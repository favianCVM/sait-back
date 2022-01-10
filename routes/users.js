const { Router } = require("express");
const { handleError } = require("../utils/index");
const {
  create_user,
  delete_user,
  get_users,
  update_user,
  auth_user,
} = require("../handlers/users");
const { ALL, ADMIN } = require("../auth/roles");
const AUTH = "../auth";
const app = Router();

app.post("/login", async (req, res) => {
  try {
    let authenticated_user = await auth_user(req, res);

    if (authenticated_user instanceof Error) {
      return handleError(
        {
          status: authenticated_user.status || 400,
          message: "Error al login.",
        },
        {},
        res
      );
    }

    return res.status(200).json(authenticated_user);
  } catch (err) {
    return handleError(
      {
        status: err.status || 500,
        message: err.message || "Error al login.",
        errorDetail: err.message,
      },
      {},
      res
    );
  }
});

app.post("/create-user", require(AUTH)([ADMIN]), async (req, res) => {
  try {
    let created_user = await create_user(req);

    if (created_user instanceof Error) {
      return handleError(
        {
          status: created_user.status || 500,
          message:
            created_user.message || "Hubo un error al crear el perfil",
        },
        {},
        res
      );
    }

    return res.status(200).json(created_user);
  } catch (err) {
    return handleError(
      {
        status: err.status || 500,
        message: err.message || "Hubo un error al crear el perfil",
        errorDetail: err.message,
      },
      {},
      res
    );
  }
});

app.get("/get-all-users", require(AUTH)([ALL]), async (req, res) => {
  try {
    let users = await get_users(req);

    if (users instanceof Error) {
      return handleError(
        {
          status: users.status || 400,
          message: "Error al obtener los perfiles.",
        },
        {},
        res
      );
    }

    return res.status(200).json(users);
  } catch (err) {
    return handleError(
      {
        status: err.status || 500,
        message: err.message || "Error al login.",
        errorDetail: err.message,
      },
      {},
      res
    );
  }
});

app.put("/update-user/:id", require(AUTH)([ADMIN]), async (req, res) => {
  try {
    let updated_user = await update_user(req);

    if (updated_user instanceof Error) {
      return handleError(
        {
          status: updated_user.status || 400,
          message: "Error al actualizar el perfil.",
        },
        {},
        res
      );
    }

    return res.status(200).json(updated_user);
  } catch (err) {
    return handleError(
      {
        status: err.status || 500,
        message: err.message || "Error al actualizar el perfil.",
        errorDetail: err.message,
      },
      {},
      res
    );
  }
});

app.delete("/delete-user/:id", require(AUTH)([ADMIN]), async (req, res) => {
  try {
    let deleted_user = await delete_user(req);

    if (deleted_user instanceof Error) {
      return handleError(
        {
          status: deleted_user.status || 400,
          message: "Error al eliminar el perfil.",
        },
        {},
        res
      );
    }

    return res.status(200).json(deleted_user);
  } catch (err) {
    return handleError(
      {
        status: err.status || 500,
        message: err.message || "Error al eliminar el perfil.",
        errorDetail: err.message,
      },
      {},
      res
    );
  }
});

module.exports = app;
