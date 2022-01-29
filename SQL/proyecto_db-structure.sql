DROP DATABASE IF EXISTS proyecto_db;
CREATE DATABASE proyecto_db; 
USE proyecto_db;


CREATE TABLE `generos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `generos_un` (`nombre`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4;

CREATE TABLE `peliculas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imagen` varchar(100) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `fecha_de_creacion` date NOT NULL,
  `calificacion` int(11) NOT NULL,
  `genero_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `peliculas_un` (`titulo`),
  KEY `peliculas_FK` (`genero_id`),
  CONSTRAINT `peliculas_FK` FOREIGN KEY (`genero_id`) REFERENCES `generos` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4;



CREATE TABLE `personajes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imagen` varchar(100) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `edad` int(6) NOT NULL,
  `peso` decimal(3,1) NOT NULL,
  `historia` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personajes_un` (`nombre`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4;

CREATE TABLE `personaje_pelicula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `personaje_id` int(11) NOT NULL,
  `pelicula_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `personaje_pelicula_FK` (`personaje_id`),
  KEY `personaje_pelicula_FK_1` (`pelicula_id`),
  CONSTRAINT `personaje_pelicula_FK` FOREIGN KEY (`personaje_id`) REFERENCES `personajes` (`id`),
  CONSTRAINT `personaje_pelicula_FK_1` FOREIGN KEY (`pelicula_id`) REFERENCES `peliculas` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4;



