module.exports = `
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

SET FOREIGN_KEY_CHECKS=0; -- to disable them

-- -----------------------------------------------------
-- Table profiles
-- -----------------------------------------------------

DROP TABLE IF EXISTS profiles;

CREATE TABLE IF NOT EXISTS profiles (
  id INT NOT NULL,
  name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(45) NOT NULL,
  sex VARCHAR(45) NOT NULL,
  dni VARCHAR(45) NOT NULL,
  role INT NOT NULL,
  birth_date DATE NOT NULL,
  PRIMARY KEY (id),
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL
  )
ENGINE = InnoDB;

INSERT INTO profiles (id, name, last_name, email, password, sex, dni, role, birth_date, createdAt, updatedAt) VALUES ('0', 'admin', 'admin', 'admin@admin.com', 'admin', 'f', '11111111111', '60', '10/10/2020', '2021-10-04', '2021-10-12');

INSERT INTO profiles (id, name, last_name, email, password, sex, dni, role, birth_date, createdAt, updatedAt) VALUES ('1', 'user', 'user', 'user@user.com', 'user', 'f', '11111111111', '50', '10/10/2020', '2021-10-04', '2021-10-12');

SET FOREIGN_KEY_CHECKS=1; -- to re-enable them

`