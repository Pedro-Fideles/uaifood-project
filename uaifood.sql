CREATE DATABASE IF NOT EXISTS uaifood;

USE uaifood;

CREATE TABLE states (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE cities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  state_id INT NOT NULL,
  FOREIGN KEY (state_id) REFERENCES states (id)
);

CREATE TABLE districts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  city_id INT NOT NULL,
  FOREIGN KEY (city_id) REFERENCES cities (id)
);

CREATE TABLE types (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE restaurants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  cnpj CHAR(14) NOT NULL,
  password VARCHAR(50) NOT NULL,
  token VARCHAR(16) NOT NULL,
  address VARCHAR(100) NOT NULL,
  number VARCHAR(10),
  complement VARCHAR(50),
  district_id INT NOT NULL,
  type_id INT NOT NULL,
  FOREIGN KEY (district_id) REFERENCES districts (id),
  FOREIGN KEY (type_id) REFERENCES types (id)
);

CREATE TABLE items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  price DECIMAL(6,2) NOT NULL,
  restaurant_id INT NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants (id)
);

CREATE TABLE ingredients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE items_has_ingredients (
  item_id INT,
  ingredient_id INT,
  PRIMARY KEY (item_id, ingredient_id),
  FOREIGN KEY (item_id) REFERENCES items (id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients (id)
);

SET character_set_client = utf8;
SET character_set_connection = utf8;
SET character_set_results = utf8;
SET collation_connection = utf8_general_ci;