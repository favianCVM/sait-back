module.exports = `
CREATE TABLE IF NOT EXISTS personas (
    id_persona int primary key auto_increment,
    nombre varchar(65) not null,
    apellido varchar(65) not null,
    genero varchar(65) not null,
    cedula varchar(65) not null
);
    
CREATE TABLE IF NOT EXISTS tecnicos (
    id_tecnico int primary key auto_increment,

    id_persona int not null,
    CONSTRAINT fk_tecnico_persona_id FOREIGN KEY (id_persona) REFERENCES personas(id_persona)
    on delete cascade
    on update cascade
);

CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario int primary key auto_increment,

  id_persona int not null,
  CONSTRAINT fk_usuario_persona_id FOREIGN KEY (id_persona) REFERENCES personas(id_persona)
  on delete cascade
  on update cascade
);

CREATE TABLE IF NOT EXISTS equipos (
  id_equipo int primary key auto_increment,

  id_usuario int not null,
  CONSTRAINT fk_equipo_usuario_id FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
  on delete cascade
  on update cascade
);

CREATE TABLE IF NOT EXISTS componentes (
  id_componente int primary key auto_increment,
  nombre varchar(65) not null,
  descripcion varchar(230) not null
);

CREATE TABLE IF NOT EXISTS equipo_componente (
  id_equipo_componente int primary key auto_increment,

  id_equipo int not null,
  CONSTRAINT fk_equipo_id FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo)
  on delete cascade
  on update cascade,

  id_componente int not null,
  CONSTRAINT fk_componente_id FOREIGN KEY (id_componente) REFERENCES componentes(id_componente)
  on delete cascade
  on update cascade
);

CREATE TABLE IF NOT EXISTS categorias (
  id_categoria int primary key auto_increment,
  nombre varchar(100) not null
);

CREATE TABLE IF NOT EXISTS proyectos (
  id_proyecto int primary key auto_increment,
  nombre varchar(100) not null
);

CREATE TABLE IF NOT EXISTS incidencias (
  id_incidencia int primary key auto_increment,
  nombre varchar(100) not null
);

CREATE TABLE IF NOT EXISTS incidencia_usuario (
  id_incidencia_usuario int primary key auto_increment,
  fecha date,

  id_incidencia int not null,
  CONSTRAINT fk_incidencia_id FOREIGN KEY (id_incidencia) REFERENCES incidencias(id_incidencia)
  on delete cascade
  on update cascade,

  id_usuario int not null,
  CONSTRAINT fk_incidencia_usuario_id FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
  on delete cascade
  on update cascade,

  id_categoria int not null,
  CONSTRAINT fk_incidencia_categoria_id FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
  on delete cascade
  on update cascade,

  id_proyecto int not null,
  CONSTRAINT fk_incidencia_proyecto_id FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto)
  on delete cascade
  on update cascade
);

CREATE TABLE IF NOT EXISTS tipos (
  id_tipo int primary key auto_increment,
  nombre varchar(65) not null,
  decripcion varchar(200) not null
);

CREATE TABLE IF NOT EXISTS fallas (
  id_falla int primary key auto_increment,
  descripcion varchar(200) not null,
  estado varchar(65) not null, 
  fecha date,

  id_tipo int not null,
  CONSTRAINT fk_falla_tipo_id FOREIGN KEY (id_tipo) REFERENCES tipos(id_tipo)
  on delete cascade
  on update cascade
);

CREATE TABLE IF NOT EXISTS incidencia_falla (
  id_incidencia_falla int primary key auto_increment,

  id_incidencia int not null,
  CONSTRAINT fk_incidencia_falla_id FOREIGN KEY (id_incidencia) REFERENCES incidencias(id_incidencia)
  on delete cascade
  on update cascade,

  id_falla int not null,
  CONSTRAINT fk_falla_incidencia_id FOREIGN KEY (id_falla) REFERENCES fallas(id_falla)
  on delete cascade
  on update cascade
);

CREATE TABLE IF NOT EXISTS falla_tecnico(
  id_falla_tecnico int primary key auto_increment,
  
  id_tecnico int not null,
  CONSTRAINT fk_tecnico_id FOREIGN KEY (id_tecnico) REFERENCES tecnicos(id_tecnico)
  on delete cascade
  on update cascade,

  id_falla int not null,
  CONSTRAINT fk_tecnico_falla_id FOREIGN KEY (id_falla) REFERENCES fallas(id_falla)
  on delete cascade
  on update cascade
)`;
