USE proyecto_db;


lock table `generos` write;
DELETE FROM `generos`;
INSERT INTO `generos` 
   (id, nombre, imagen )
VALUES
    (1, 'Comedia','genre1643471069066.jpg'),
    (2,'Drama','genre1643471212213.png'),
    (3,'Suspenso','genre1643471364755.jpg');
UNLOCK TABLES;


lock table `peliculas` write;
DELETE FROM `peliculas`;
INSERT INTO `peliculas` 
   (id, imagen, titulo,fecha_de_creacion, calificacion, genero_id)
VALUES
    (1,'movie1643471966010.jpg','No mires arriba','2021-12-10',4,1),
    (2,'movie1643472276347.jpg','El Padrino','1972-10-20',5,2),
    (3,'movie1643472562886.jpg','Uno de los nuestros','1990-10-19',3,3);
UNLOCK TABLES;


LOCK TABLE `personajes` WRITE;
DELETE FROM `personajes`;
INSERT INTO `personajes` 
   (id, imagen, nombre, edad, peso, historia)
VALUES
(1,'character1643474365871.jpg','Leonardo Wilhelm DiCaprio',47,70,'Hijo de padre italiano y madre alemana, Leonardo DiCaprio comienza sus clases de interpretación desde la escuela primaria. Hace su primera audición en 1988, y empieza su carrera haciendo anuncios publicitarios'),
(2,'character1643474664459.jpg','Marlon Brando',88,75,'Marlon Brando se une al Actor Studio de New York, y comienza su carrera como actor encima de los escenarios. En 1950, debuta en la gran pantalla en la cinta ‘Hombres’, donde encarna a un inválido de la guerra'),
(3,'character1643474731657.jpg','Al Pacino',60,85,'Hijo de Salvator Pacino, albañil, y Rose Gerard, ambos originarios de Sicilia. Fue criado por sus abuelos maternos James y Kate Gerard. Alfred James Pacino recibe desde sus inicios como actor varias nominaciones a los Oscar, pero no consigue su primera estatuilla hasta 1992 por ‘Esencia de mujer’, inspirada en la novela ‘Perfume de mujer’ de Giovanni Arpino. Veinte años antes, obtuvo su primera nominación por su interpretación de Michael Corleone en ‘El Padrino’, de Francis Ford Coppola'),
(4,'character1643474771231.jpg','James Cann',85,80,'James Cann nace el 22 de abril 1937 en Nueva York (Estados Unidos). Tras una infancia difícil, a los 17 años decide instalarse en Los Ángeles tras finalizar sus estudios de primaria. Allí comienza a trabajar como chico de los recados para la compañía cinematográfica y pronto se matricula para estudiar Arte Dramático en el Players Ring Theatre'),
(5,'character1643474850102.jpg','Robert De Niro',79,85,'Robert De Niro creció en el pequeño barrio italiano de Nueva York. Dejó la escuela a los 16 años para seguir sus estudios de arte dramático en Dramatic Workshop, la escuela de teatro de Stella Adler y el estudio Luther James. Sigue las enseñanzas de Lee Strasberg en el Actors Studio, donde conoce a Harvey Keitel');
UNLOCK TABLES;

LOCK TABLE `personaje_pelicula` WRITE;
DELETE FROM `personaje_pelicula`;
INSERT INTO `personaje_pelicula` 
   (id, personaje_id, pelicula_id  )
VALUES
  (1,1,1),
  (2,2,2),
  (3,3,2),
  (4,4,2),
  (5,5,1),
  (6,5,3);
UNLOCK TABLES;

