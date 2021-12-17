module.exports = `
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

SET FOREIGN_KEY_CHECKS=0; -- to disable them

-- -----------------------------------------------------
-- Table users
-- -----------------------------------------------------

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
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


-- -----------------------------------------------------
-- Table incidences
-- -----------------------------------------------------

DROP TABLE IF EXISTS issues ;


CREATE TABLE IF NOT EXISTS incidences (
  id INT NOT NULL,
  description VARCHAR(45) NOT NULL,
  date VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table issue_types
-- -----------------------------------------------------

DROP TABLE IF EXISTS issue_types ;


CREATE TABLE IF NOT EXISTS issue_types (
  id INT NOT NULL,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL
  )
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table device_types
-- -----------------------------------------------------

DROP TABLE IF EXISTS device_types ;


CREATE TABLE IF NOT EXISTS device_types (
  id INT NOT NULL,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL
  )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table components
-- -----------------------------------------------------

DROP TABLE IF EXISTS components ;


CREATE TABLE IF NOT EXISTS components (
  id INT NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table issues
-- -----------------------------------------------------

DROP TABLE IF EXISTS issues ;


CREATE TABLE IF NOT EXISTS issues (
  id INT NOT NULL,
  id_issue_type INT NOT NULL,
  description VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL,
  INDEX fk_issue_issue_type1_idx (id_issue_type ASC) ,
  CONSTRAINT fk_issue_issue_type1
    FOREIGN KEY (id_issue_type)
    REFERENCES issue_types (id)
    on delete cascade
    on update cascade)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table devices
-- -----------------------------------------------------

DROP TABLE IF EXISTS devices ;


CREATE TABLE IF NOT EXISTS devices (
  id INT NOT NULL,
  id_user INT NOT NULL,
  id_device_type INT NOT NULL,
  device_number VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL,
  INDEX fk_device_user1_idx (id_user ASC) ,
  INDEX fk_device_device_type1_idx (id_device_type ASC) , 
  CONSTRAINT fk_device_user1
    FOREIGN KEY (id_user)
    REFERENCES users (id)
    on delete cascade
    on update cascade,
  CONSTRAINT fk_device_device_type1
    FOREIGN KEY (id_device_type)
    REFERENCES device_types (id)
    on delete cascade
    on update cascade)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table device_component
-- -----------------------------------------------------

DROP TABLE IF EXISTS device_component ;

CREATE TABLE IF NOT EXISTS device_component (
  id INT NOT NULL,
  id_device INT NOT NULL,
  id_component INT NOT NULL,
  PRIMARY KEY (id),
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL,
  INDEX fk_device_component_device_idx (id_device ASC) ,
  INDEX fk_device_component_component1_idx (id_component ASC) ,
  CONSTRAINT fk_device_component_device
    FOREIGN KEY (id_device)
    REFERENCES devices (id)
    on delete cascade
    on update cascade,
  CONSTRAINT fk_device_component_component1
    FOREIGN KEY (id_component)
    REFERENCES components (id)
    on delete cascade
    on update cascade)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table incidence_issue
-- -----------------------------------------------------

DROP TABLE IF EXISTS incidence_issue ;



CREATE TABLE IF NOT EXISTS incidence_issue (
  id INT NOT NULL,
  id_incidence INT NOT NULL,
  id_issue INT NOT NULL,
  PRIMARY KEY (id),
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL,
  INDEX fk_incidence_issue_incidence1_idx (id_incidence ASC) ,
  INDEX fk_incidence_issue_issue1_idx (id_issue ASC) ,
  CONSTRAINT fk_incidence_issue_incidence1
    FOREIGN KEY (id_incidence)
    REFERENCES incidences (id)
    on delete cascade
    on update cascade,
  CONSTRAINT fk_incidence_issue_issue1
    FOREIGN KEY (id_issue)
    REFERENCES issues (id)
    on delete cascade
    on update cascade)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table user_incidence
-- -----------------------------------------------------

DROP TABLE IF EXISTS user_incidence ;


CREATE TABLE IF NOT EXISTS user_incidence (
  id INT NOT NULL,
  id_user INT NOT NULL,
  id_incidence INT NOT NULL,
  PRIMARY KEY (id),
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL,
  INDEX fk_user_incidence_user1_idx (id_user ASC) ,
  INDEX fk_user_incidence_incidence1_idx (id_incidence ASC) ,
  CONSTRAINT fk_user_incidence_user1
    FOREIGN KEY (id_user)
    REFERENCES users (id)
    on delete cascade
    on update cascade,
  CONSTRAINT fk_user_incidence_incidence1
    FOREIGN KEY (id_incidence)
    REFERENCES incidences (id)
    on delete cascade
    on update cascade)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table issue_device
-- -----------------------------------------------------

DROP TABLE IF EXISTS issue_device ;


CREATE TABLE IF NOT EXISTS issue_device (
  id INT NOT NULL,
  id_device INT NOT NULL,
  id_issue INT NOT NULL,
  PRIMARY KEY (id),
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL,
  INDEX fk_issue_device_device1_idx (id_device ASC) ,
  INDEX fk_issue_device_issue1_idx (id_issue ASC) ,
  CONSTRAINT fk_issue_device_device1
    FOREIGN KEY (id_device)
    REFERENCES devices (id)
    on delete cascade
    on update cascade,
  CONSTRAINT fk_issue_device_issue1
    FOREIGN KEY (id_issue)
    REFERENCES issues (id)
    on delete cascade
    on update cascade)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table technicians
-- -----------------------------------------------------

DROP TABLE IF EXISTS technicians ;


CREATE TABLE IF NOT EXISTS technicians (
  id INT NOT NULL,
  id_user INT NOT NULL,
  PRIMARY KEY (id),
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL,
  INDEX fk_technician_user1_idx (id_user ASC) ,
  CONSTRAINT fk_technician_user1
    FOREIGN KEY (id_user)
    REFERENCES users (id)
    on delete cascade
    on update cascade)
ENGINE = InnoDB; 

INSERT INTO users (id, name, last_name, email, password, sex, dni, role, birth_date, createdAt, updatedAt) VALUES ('0', 'admin', 'admin', 'admin@admin.com', 'admin', 'f', '11111111111', '60', '10/10/2020', '2021-10-04', '2021-10-12');

SET FOREIGN_KEY_CHECKS=1; -- to re-enable them

`