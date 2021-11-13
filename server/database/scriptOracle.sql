/*Establecimiento del esquema*/

/*Aquí se debe cambiar la contraseña por la que se tenga en el gestor*/
CONNECT SYSTEM/leisy123; 
ALTER SESSION SET CONTAINER=CDB$ROOT;
CREATE TABLESPACE TablespaceEcoCol LOGGING DATAFILE 'C:\DatabaseEcoCol\TablespaceEcoCol.dbf' SIZE 
15M EXTENT MANAGEMENT LOCAL SEGMENT SPACE MANAGEMENT AUTO;
ALTER SESSION set "_ORACLE_SCRIPT"=true; 
CREATE USER admin PROFILE DEFAULT IDENTIFIED BY 123 DEFAULT TABLESPACE TablespaceEcoCol TEMPORARY
TABLESPACE TEMP ACCOUNT UNLOCK; 
GRANT CONNECT, RESOURCE, DBA TO admin;  
CONNECT admin/123;
/*DROP USER admin CASCADE; 
START C:\Users\leisy\Desktop\EcoCol\server\database\scriptOracle.sql
DROP TABLESPACE TablespaceEcoCol INCLUDING CONTENTS AND DATAFILES;*/


/* Estructura de la base de datos */

CREATE TABLE users (
  id INTEGER,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(80) NOT NULL,
  password VARCHAR(20) NOT NULL,
  typeUser VARCHAR(10) NOT NULL,
  birthDay DATE,
  profilePhoto VARCHAR(1000), 
  PRIMARY KEY (id)
) TABLESPACE TablespaceEcoCol; 

CREATE TABLE cities (
  code INTEGER,
  name VARCHAR(85) NOT NULL,
  PRIMARY KEY (code)
) TABLESPACE TablespaceEcoCol;

INSERT INTO cities (code, name) VALUES(05079, 'Barbosa'); 
INSERT INTO cities (code, name) VALUES(05088, 'Bello'); 
INSERT INTO cities (code, name) VALUES(05129, 'Caldas'); 
INSERT INTO cities (code, name) VALUES(05212, 'Copacabana'); 
INSERT INTO cities (code, name) VALUES(05266, 'Envigado'); 
INSERT INTO cities (code, name) VALUES(05308, 'Girardota'); 
INSERT INTO cities (code, name) VALUES(05360, 'Itagüi'); 
INSERT INTO cities (code, name) VALUES(05380, 'La Estrella'); 
INSERT INTO cities (code, name) VALUES(05001, 'Medellín'); 
INSERT INTO cities (code, name) VALUES(05631, 'Sabaneta'); 

CREATE TABLE places (
   id INTEGER,
   codeCity INTEGER NOT NULL, 
   name VARCHAR(255) NOT NULL,
   hashCodeQR VARCHAR(255),
   codeLocation VARCHAR(255),
   description VARCHAR(800) NOT NULL,
   recommendations VARCHAR(255) NOT NULL,
   address VARCHAR(150) NOT NULL,
   hours VARCHAR(200) NOT NULL,
   entryPrice VARCHAR(200) NOT NULL,
   fauna VARCHAR(500) NOT NULL,
   flora VARCHAR(500) NOT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (codeCity) REFERENCES cities(code)
) TABLESPACE TablespaceEcoCol; 

INSERT INTO(id, codeCity, name, hashCodeQR, codeLocation, description, recommendations, address, hours, entryPrice, fauna, flora)
VALUES (1, )
CREATE TABLE favoritedAndVisitedPlaces (
  idUser INTEGER, 
  idPlace INTEGER,
  detail VARCHAR(20) NOT NULL,
  PRIMARY KEY (idUser, idPlace),
  FOREIGN KEY (idUser) REFERENCES users(id),
  FOREIGN KEY (idPlace) REFERENCES places(id)
) TABLESPACE TablespaceEcoCol; 

CREATE TABLE photoPlaces (
   id INTEGER,
   idPlace INTEGER NOT NULL,
   photoPath VARCHAR(1000) NOT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (idPlace) REFERENCES places(id)
) TABLESPACE TablespaceEcoCol; 

