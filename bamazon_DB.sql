DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(30) NOT NULL,
	price INTEGER(10) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)

);

INSERT INTO products 
(product_name, department_name, price, stock_quantity)
VALUES 
('MacBook-Pro', 'Electronics-Department', 2000, 60),
('iPad-Pro', 'Electronics-Department', 1000, 20),
('Apple-TV', 'Electronics-Department', 200, 100),
('Nike-Socks', 'Apparel-Department', 10, 300),
('Adidas-Socks', 'Apparel-Department', 10, 200),
('Puma-Socks', 'Apparel-Department', 8, 100),
('Abstract-Painting', 'Art-Department', 5000, 2),
('Painting-Kit', 'Art-Department', 60, 200),
('Canvas', 'Art-Department', 10, 300),
('Easels', 'Art', 200, 30);

SELECT * FROM products