const { Router } = require("express");
const { handleError } = require("../utils/index");
const {
  create_device,
  get_devices,
  update_device,
  delete_device,
} = require("../handlers/devices/index");
const { ALL, ADMIN, TECHNICIAN } = require("../auth/roles");
const AUTH = "../auth";
const app = Router();


app.post("/create-device", require(AUTH)([ADMIN]), async (req, res) => {
  try {
    let device_created = await create_device(req, res);

    if (device_created instanceof Error) {
      return handleError(
        {
          status: device_created.status || 400,
          message: "Error al crear el equipo.",
        },
        {},
        res
      );
    }

    return res.status(200).json(device_created);
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
})

app.put("/update-device/:id", require(AUTH)([ADMIN]), async (req, res) => {
  try {
    let updated_deviec = await update_device(req);

    if (updated_deviec instanceof Error) {
      return handleError(
        {
          status: updated_deviec.status || 400,
          message: "Error al actualizar el equipo.",
        },
        {},
        res
      );
    }

    return res.status(200).json(updated_deviec);
  } catch (err) {
    return handleError(
      {
        status: err.status || 500,
        message: err.message || "Error al actualizar el equipo.",
        errorDetail: err.message,
      },
      {},
      res
    );
  }
});

app.get("/get-all-devices", require(AUTH)([ADMIN]), async (req, res) => {
  try {
    let devices = await get_devices(req, res);

    if (devices instanceof Error) {
      return handleError(
        {
          status: devices.status || 400,
          message: "Error al obtener los equipos.",
        },
        {},
        res
      );
    }

    return res.status(200).json(devices);
  } catch (err) {
    return handleError(
      {
        status: err.status || 500,
        message: err.message || "Error al obtener los equipos.",
        errorDetail: err.message,
      },
      {},
      res
    );
  }
})


app.delete("/delete-device/:id", require(AUTH)([ADMIN]), async (req, res) => {
  try {
    let deleted_device = await delete_device(req);

    if (deleted_device instanceof Error) {
      return handleError(
        {
          status: deleted_device.status || 400,
          message: "Error al eliminar el equipo.",
        },
        {},
        res
      );
    }

    return res.status(200).json(deleted_device);
  } catch (err) {
    return handleError(
      {
        status: err.status || 500,
        message: err.message || "Error al eliminar el equipo.",
        errorDetail: err.message,
      },
      {},
      res
    );
  }
});

module.exports = app