"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const dotenv = require("dotenv");
dotenv.config();

const db = {};
const { PGUSER, PGPASSWORD, PGPORT, PGHOST, DB_URL, PGDATABASE } = process.env;

var sequelize;

if (process.env.NODE_ENV === "development")
  sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    port: PGPORT,
    dialect: "postgres",
    logging: false,
  });
// else if (process.env.NODE_ENV === "production")
else
  sequelize = new Sequelize(DB_URL, {
    omitNull: true,
    underscored: true,
    underscoredAll: true,
  });

// sequelize = new Sequelize(
//   `postgres://${PGUSER}:${PGPASSWORD}@localhost:${PGPORT}:${PGDATABASE}`,
//   {
//     omitNull: true,
//     underscored: true,
//     underscoredAll: true,
//   }
// );

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
