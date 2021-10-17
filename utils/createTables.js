module.exports = `
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

SET FOREIGN_KEY_CHECKS=0; -- to disable them

-- -----------------------------------------------------
-- Table profiles
-- -----------------------------------------------------

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


-- -----------------------------------------------------
-- Table incidences
-- -----------------------------------------------------


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


CREATE TABLE IF NOT EXISTS devices (
  id INT NOT NULL,
  id_profile INT NOT NULL,
  id_device_type INT NOT NULL,
  device_number VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL,
  INDEX fk_device_profile1_idx (id_profile ASC) ,
  INDEX fk_device_device_type1_idx (id_device_type ASC) , 
  CONSTRAINT fk_device_profile1
    FOREIGN KEY (id_profile)
    REFERENCES profiles (id)
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
-- Table profile_incidence
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS profile_incidence (
  id INT NOT NULL,
  id_profile INT NOT NULL,
  id_incidence INT NOT NULL,
  PRIMARY KEY (id),
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL,
  INDEX fk_profile_incidence_profile1_idx (id_profile ASC) ,
  INDEX fk_profile_incidence_incidence1_idx (id_incidence ASC) ,
  CONSTRAINT fk_profile_incidence_profile1
    FOREIGN KEY (id_profile)
    REFERENCES profiles (id)
    on delete cascade
    on update cascade,
  CONSTRAINT fk_profile_incidence_incidence1
    FOREIGN KEY (id_incidence)
    REFERENCES incidences (id)
    on delete cascade
    on update cascade)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table issue_device
-- -----------------------------------------------------


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


CREATE TABLE IF NOT EXISTS technicians (
  id INT NOT NULL,
  id_profile INT NOT NULL,
  PRIMARY KEY (id),
  createdAt DATE NOT NULL,
  updatedAt DATE NOT NULL,
  INDEX fk_technician_profile1_idx (id_profile ASC) ,
  CONSTRAINT fk_technician_profile1
    FOREIGN KEY (id_profile)
    REFERENCES profiles (id)
    on delete cascade
    on update cascade)
ENGINE = InnoDB; 


SET FOREIGN_KEY_CHECKS=1; -- to re-enable them

`