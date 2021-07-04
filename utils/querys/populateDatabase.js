module.exports = `
  insert into personas(nombre, apellido, genero, cedula) values ("Olivier", "Gebo", "masculino", "12456789");
  insert into personas(nombre, apellido, genero, cedula) values ("Zacarias", "Gascon", "masculino", "13456789");
  insert into personas(nombre, apellido, genero, cedula) values ("Fausto", "Velasquez", "masculino", "25114736");
  insert into personas(nombre, apellido, genero, cedula) values ("Jesus", "Wells", "masculino", "12357489");
  insert into personas(nombre, apellido, genero, cedula) values ("Manuel", "Smith", "masculino", "94753869");
  insert into personas(nombre, apellido, genero, cedula) values ("Carlos", "Correon", "masculino", "25146367");
  insert into personas(nombre, apellido, genero, cedula) values ("Emanuel", "Camaron", "femenino", "16753869");
  insert into personas(nombre, apellido, genero, cedula) values ("Elijah", "Izquierdo", "femenino", "96741852");

  insert into componentes(nombre, descripcion) values ("memoria ram", "a");
  insert into componentes(nombre, descripcion) values ("procesador", "a");
  insert into componentes(nombre, descripcion) values ("disco duro", "a");
  insert into componentes(nombre, descripcion) values ("chip de bios", "a");
  insert into componentes(nombre, descripcion) values ("fan cooler", "a");
  insert into componentes(nombre, descripcion) values ("placa base", "a");
  
  insert into tecnicos(id_persona) values (1);
  insert into tecnicos(id_persona) values (2);
  insert into tecnicos(id_persona) values (3);

  insert into usuarios(id_persona) values (4);
  insert into usuarios(id_persona) values (5);
  insert into usuarios(id_persona) values (6);
  insert into usuarios(id_persona) values (7);
  insert into usuarios(id_persona) values (8);

  insert into equipos(id_usuario) values (1);
  insert into equipos(id_usuario) values (2);
  insert into equipos(id_usuario) values (3);
  insert into equipos(id_usuario) values (4);
  insert into equipos(id_usuario) values (5);

  insert into equipo_componente(id_equipo, id_componente) values (1, 1);
  insert into equipo_componente(id_equipo, id_componente) values (1, 2);
  insert into equipo_componente(id_equipo, id_componente) values (1, 3);
  insert into equipo_componente(id_equipo, id_componente) values (1, 4);
  insert into equipo_componente(id_equipo, id_componente) values (1, 5);
  insert into equipo_componente(id_equipo, id_componente) values (1, 6);
  
  insert into equipo_componente(id_equipo, id_componente) values (2, 1);
  insert into equipo_componente(id_equipo, id_componente) values (2, 2);
  insert into equipo_componente(id_equipo, id_componente) values (2, 3);
  insert into equipo_componente(id_equipo, id_componente) values (2, 4);
  insert into equipo_componente(id_equipo, id_componente) values (2, 5);
  insert into equipo_componente(id_equipo, id_componente) values (2, 6);
  
  insert into equipo_componente(id_equipo, id_componente) values (3, 1);
  insert into equipo_componente(id_equipo, id_componente) values (3, 2);
  insert into equipo_componente(id_equipo, id_componente) values (3, 3);
  insert into equipo_componente(id_equipo, id_componente) values (3, 4);
  insert into equipo_componente(id_equipo, id_componente) values (3, 5);
  insert into equipo_componente(id_equipo, id_componente) values (3, 6);
  
  insert into equipo_componente(id_equipo, id_componente) values (4, 1);
  insert into equipo_componente(id_equipo, id_componente) values (4, 2);
  insert into equipo_componente(id_equipo, id_componente) values (4, 3);
  insert into equipo_componente(id_equipo, id_componente) values (4, 4);
  insert into equipo_componente(id_equipo, id_componente) values (4, 5);
  insert into equipo_componente(id_equipo, id_componente) values (4, 6);
  
  insert into equipo_componente(id_equipo, id_componente) values (5, 1);
  insert into equipo_componente(id_equipo, id_componente) values (5, 2);
  insert into equipo_componente(id_equipo, id_componente) values (5, 3);
  insert into equipo_componente(id_equipo, id_componente) values (5, 4);
  insert into equipo_componente(id_equipo, id_componente) values (5, 5);
  insert into equipo_componente(id_equipo, id_componente) values (5, 6); 

  insert into incidencias(nombre) values("Windows malfuncionando");
  insert into incidencias(nombre) values("monitor no muestra imagen");
  insert into incidencias(nombre) values("teclado no funciona");
  insert into incidencias(nombre) values("powerpoint no funciona");
  insert into incidencias(nombre) values("word no funciona");
  insert into incidencias(nombre) values("mouse no funciona");
  `;
