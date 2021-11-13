DROP DATABASE IF EXISTS ecocol;
CREATE DATABASE IF NOT EXISTS ecocol;

DROP TABLE IF EXISTS `city`;
DROP TABLE IF EXISTS `favoritedAndVisitedPlace`;
DROP TABLE IF EXISTS `photoPlace`;
DROP TABLE IF EXISTS `place`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE `city` (
  `code` int(10) AUTO_INCREMENT,
  `name` varchar(85) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `favoritedAndVisitedPlace`
--

CREATE TABLE `favoritedAndVisitedPlace` (
  `id` int(10),
  `idUser` int(15) NOT NULL,
  `idPlace` int(10) NOT NULL,
  `detail` enum('visited','favourite','visitedAndFavourite') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `photoPlace`
--

CREATE TABLE `photoPlace` (
  `id` int(15),
  `idPlace` int(10) NOT NULL,
  `photoPath` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `place`
--

CREATE TABLE `place` (
  `id` int(10),
  `name` varchar(255) NOT NULL,
  `codeCity` int(10) NOT NULL,
  `hashCodeQR` varchar(255) DEFAULT NULL,
  `codeLocation` varchar(255) DEFAULT NULL,
  `description` TEXT NOT NULL,
  `recommendations` varchar(255) NOT NULL,
  `address` varchar(150) NOT NULL,
  `hours` varchar(200) NOT NULL,
  `entryPrice` varchar(200) NOT NULL,
  `fauna` TEXT NOT NULL,
  `flora` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(15),
  `name` varchar(120) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(50) NOT NULL,
  `typeUser` enum('editor','traveler') NOT NULL,
  `birthDay` date NOT NULL,
  `profilePhoto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `favoritedAndVisitedPlace`
--
ALTER TABLE `favoritedAndVisitedPlace`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`,`idPlace`),
  ADD KEY `idPlace` (`idPlace`);

--
-- Indexes for table `photoPlace`
--
ALTER TABLE `photoPlace`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPlace` (`idPlace`),
  ADD KEY `idPlace_2` (`idPlace`);

--
-- Indexes for table `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`id`),
  ADD KEY `codeCity` (`codeCity`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favoritedAndVisitedPlace`
--
ALTER TABLE `favoritedAndVisitedPlace`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `photoPlace`
--
ALTER TABLE `photoPlace`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;


--
-- Constraints for dumped tables
--

--
-- Constraints for table `favoritedAndVisitedPlace`
--
ALTER TABLE `favoritedAndVisitedPlace`
  ADD CONSTRAINT `favoritedAndVisitedPlace_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `favoritedAndVisitedPlace_ibfk_2` FOREIGN KEY (`idPlace`) REFERENCES `place` (`id`);

--
-- Constraints for table `photoPlace`
--
ALTER TABLE `photoPlace`
  ADD CONSTRAINT `photoPlace_ibfk_1` FOREIGN KEY (`idPlace`) REFERENCES `place` (`id`);

--
-- Constraints for table `place`
--
ALTER TABLE `place`
  ADD CONSTRAINT `place_ibfk_1` FOREIGN KEY (`codeCity`) REFERENCES `city` (`code`);
COMMIT;

INSERT INTO city (code, name) VALUES (1, 'Medellín');
INSERT INTO city (code, name) VALUES (2, 'Caldas');
INSERT INTO city (code, name) VALUES (3, 'Bello');
INSERT INTO city (name) VALUES ('Itagüí');
INSERT INTO city (code, name) VALUES (4, 'Itagüí');