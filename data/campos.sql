-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 09-07-2012 a las 05:27:11
-- Versión del servidor: 5.5.16
-- Versión de PHP: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `buscador`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campos`
--

CREATE TABLE IF NOT EXISTS `campos` (
  `titulo` varchar(100) NOT NULL,
  `link` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `id` int(100) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Volcado de datos para la tabla `campos`
--

INSERT INTO `campos` (`titulo`, `link`, `descripcion`, `id`) VALUES
('google.com', 'http://www.google.com', 'buscador de google', 1),
('taringa.net', 'http://www.taringa.net', 'inteligencia colectiva', 2),
('translate', 'http://www.translate.google.com', 'traductor de google', 3),
('tutoriales', 'http://www.tutotirales.com', 'tutoriales de programacion', 4),
('tugol', 'http://www.tugol.com', 'tugol ', 5),
('trolface', 'khio', 'boibo', 6),
('tknpvoviob', 'oiboibioboi', 'biobo', 7),
('tvchjxcrt', 'kvcyuxcicko', 'boiboi', 8),
('tkjbobiobibpb', 'biboipobp', 'npoo', 9),
('tewrwrze', 'fgctcu', 'vi', 10),
('toihoibnipo', 'npnpon', 'pnp', 11);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
