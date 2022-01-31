const bcrypt = require("bcryptjs");
const db = require("../connection");

module.exports = async () => {
  let salt = await bcrypt.genSalt(15);

  let hashedAdminPass = await bcrypt.hash("administrador", salt);
  let hashedTechnicianPass = await bcrypt.hash("tecnico", salt);
  let hashedUserPass = await bcrypt.hash("usuario", salt);

  let query = `

    DROP TABLE IF EXISTS users cascade;
    DROP TABLE IF EXISTS technicians cascade;
    DROP TABLE IF EXISTS components cascade;
    DROP TABLE IF EXISTS items cascade;
    DROP TABLE IF EXISTS devices cascade;
    DROP TABLE IF EXISTS errors cascade;
    DROP TABLE IF EXISTS incidence_types cascade;
    DROP TABLE IF EXISTS device_types cascade;
    DROP TABLE IF EXISTS incidences cascade;
    DROP TABLE IF EXISTS incidence_errors cascade;
    DROP TABLE IF EXISTS error_items cascade;
    DROP TABLE IF EXISTS device_components cascade;
    DROP TABLE IF EXISTS item_categories cascade;
    DROP TABLE IF EXISTS device_items cascade;
    DROP TABLE IF EXISTS device_incidences cascade;
    DROP TABLE IF EXISTS error_components cascade;
    DROP TABLE IF EXISTS technician_incidences cascade;

    CREATE TABLE "users" (
      "id" int4 GENERATED BY DEFAULT AS IDENTITY,
      "first_name" varchar(255) NOT NULL,
      "last_name" varchar(255) NOT NULL,
      "dni" varchar(255) NOT NULL,
      "email" varchar(255) NOT NULL,
      "birth_date" date NOT NULL,
      "role" int8 NOT NULL,
      "password" varchar(500) NOT NULL,
      "profile_picture" varchar(400),
      "profile_picture_id" varchar(400),
      "sex" varchar(1) NOT NULL,
      "disabled" int4,
      CONSTRAINT "_copy_1" PRIMARY KEY ("id")
    );

    -- components are the countable elements and its category its the identifier
    -- example: category: ram ddr3   component: serial 21212121212 
    -- then its possible make an account of items by its categories

    CREATE TABLE "items" (
      "id" int4 GENERATED BY DEFAULT AS IDENTITY,
      "serial" varchar(400),
      "item_category_id" int4 NOT NULL,
      "disabled" int4,
      "assigned" int4,
      CONSTRAINT "_copy_2" PRIMARY KEY ("id")
    );

    CREATE TABLE "item_categories" (
      "id" int4 GENERATED BY DEFAULT AS IDENTITY,
      "name" varchar(255) NOT NULL,
      "description" varchar(400) NOT NULL,
      "picture" varchar(400),
      "picture_id" varchar(400),
      "disabled" int4,
      CONSTRAINT "_copy_3" PRIMARY KEY ("id")
    );
      
    CREATE TABLE "technicians" (
      "id" int4 GENERATED BY DEFAULT AS IDENTITY,
      "user_id" int4 NOT NULL,
      CONSTRAINT "_copy_4" PRIMARY KEY ("id")
    );

    CREATE TABLE "errors" (
      "id" int4 GENERATED BY DEFAULT AS IDENTITY,
      "description" varchar(255) NOT NULL,
      "incidence_id" int4 NOT NULL,
      CONSTRAINT "_copy_5" PRIMARY KEY ("id")
    );

    CREATE TABLE "incidences" (
      "id" int4 GENERATED BY DEFAULT AS IDENTITY,
      "description" varchar(255) NOT NULL,
      "user_id" int4 NOT NULL,
      "device_id" int4 NOT NULL,
      "location" varchar(400) NOT NULL,
      "priority" int4 NOT NULL,
      "status" varchar(60) NOT NULL,
      "date" date NOT NULL,
      "end_date" date,
      "incidence_type" varchar(400),
      CONSTRAINT "_copy_6" PRIMARY KEY ("id")
    );

    CREATE TABLE "devices" (
      "id" int4 GENERATED BY DEFAULT AS IDENTITY,
      "serial" varchar(255) NOT NULL,
      "device_type_id" int4 NOT NULL,
      "disabled" int4,
      CONSTRAINT "_copy_7" PRIMARY KEY ("id")
    );

    CREATE TABLE "device_types" (
      "id" int4 GENERATED BY DEFAULT AS IDENTITY,
      "name" varchar(255) NOT NULL,
      CONSTRAINT "_copy_8" PRIMARY KEY ("id")
    );

    CREATE TABLE "error_items" (
      "id" int4 GENERATED BY DEFAULT AS IDENTITY,
      "error_id" int4 NOT NULL,
      "item_id" int4 NOT NULL,
      CONSTRAINT "_copy_9" PRIMARY KEY ("id")
    );

    CREATE TABLE "technician_incidences" (
      "id" int4 GENERATED BY DEFAULT AS IDENTITY,
      "incidence_id" int4 NOT NULL,
      "technician_id" int4 NOT NULL,
      CONSTRAINT "_copy_10" PRIMARY KEY ("id")
    );
    
    CREATE TABLE "device_items" (
      "id" int4 GENERATED BY DEFAULT AS IDENTITY,
      "item_id" int4 NOT NULL,
      "device_id" int4 NOT NULL,
      CONSTRAINT "_copy_11" PRIMARY KEY ("id")
    );

    --device-item
    ALTER TABLE "device_items" ADD CONSTRAINT "device_items_device_id" FOREIGN KEY ("device_id") REFERENCES "devices" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

    ALTER TABLE "device_items" ADD CONSTRAINT "device_items_item_id" FOREIGN KEY ("item_id") REFERENCES "items" ("id") ON DELETE CASCADE ON UPDATE CASCADE;


    --device type
    ALTER TABLE "devices" ADD CONSTRAINT "device_type_id" FOREIGN KEY ("device_type_id") REFERENCES "device_types" ("id") ON DELETE CASCADE ON UPDATE CASCADE;


    --error-item
    ALTER TABLE "error_items" ADD CONSTRAINT "error_items_incident_id" FOREIGN KEY ("error_id") REFERENCES "errors" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

    ALTER TABLE "error_items" ADD CONSTRAINT "error_items_item_id" FOREIGN KEY ("item_id") REFERENCES "items" ("id") ON DELETE CASCADE ON UPDATE CASCADE;


    --error incidence_id
    ALTER TABLE "errors" ADD CONSTRAINT "errors_incidence_id" FOREIGN KEY ("incidence_id") REFERENCES "incidences" ("id") ON DELETE CASCADE ON UPDATE CASCADE;


    --incidence-user
    ALTER TABLE "incidences" ADD CONSTRAINT "incidences_user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

    --incidence-device
    ALTER TABLE "incidences" ADD CONSTRAINT "incidences_device_id" FOREIGN KEY ("device_id") REFERENCES "devices" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

    --technician-incidences
    ALTER TABLE "technician_incidences" ADD CONSTRAINT "technician_incidences_incidence_id" FOREIGN KEY ("incidence_id") REFERENCES "incidences" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

    ALTER TABLE "technician_incidences" ADD CONSTRAINT "technician_incidences_technician_id" FOREIGN KEY ("technician_id") REFERENCES "technicians" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
    

    --technician user-Id
    ALTER TABLE "technicians" ADD CONSTRAINT "technician_user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

    --insert users

    INSERT INTO users (first_name, last_name, email, password, sex, dni, role, birth_date) VALUES ('Carlos', 'Pereira', 'carlos@gmail.com', '${hashedAdminPass}', 'M', '11111111111', '60', '1995-12-17T03:24:00');

    INSERT INTO users (first_name, last_name, email, password, sex, dni, role, birth_date) VALUES ('Yerlin', 'Herrera', 'yerlin@gamil.com', '${hashedAdminPass}', 'F', '12121212121', '60', '1995-12-17T03:24:00');

    INSERT INTO users (first_name, last_name, email, password, sex, dni, role, birth_date) VALUES ('Dhenisse', 'Velasquez', 'dhenisse@gmail.com', '${hashedUserPass}', 'F', '144324324324', '50', '1995-12-17T03:24:00');

    INSERT INTO users (first_name, last_name, email, password, sex, dni, role, birth_date) VALUES ('Fabian', 'Salazar', 'fabian@gmail.com', '${hashedUserPass}', 'F', '144324324324', '50', '1995-12-17T03:24:00');

    INSERT INTO users (first_name, last_name, email, password, sex, dni, role, birth_date) VALUES ('Jesus', 'Christo', 'jesus@gmail.com', '${hashedTechnicianPass}', 'F', '144324324324', '55', '1995-12-17T03:24:00');

    INSERT INTO users (first_name, last_name, email, password, sex, dni, role, birth_date) VALUES ('Manuel', 'Perez', 'manuel@gmail.com', '${hashedTechnicianPass}', 'M', '4545435455', '55', '1995-12-17T03:24:00');

    INSERT INTO users (first_name, last_name, email, password, sex, dni, role, birth_date) VALUES ('Vanessa', 'Lopez', 'venessa@gmail.com', '${hashedTechnicianPass}', 'F', '4545435455', '55', '1995-12-17T03:24:00');
    
    INSERT INTO users (first_name, last_name, email, password, sex, dni, role, birth_date) VALUES ('Raul', 'Ponte', 'raul@usuario.com', '${hashedUserPass}', 'F', '11111111111', '50', '1995-12-17T03:24:00');
  `;

  return new Promise((resolve, reject) => {
    db.query(query, (error) => {
      if (error) reject(error);
      else {
        console.log("tables initialized =::::::");
        resolve(true);
      }
    });
  });
};
