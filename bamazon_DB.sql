DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
	department VARCHAR(30) NOT NULL,
	price INTEGER(10) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)

);

INSERT INTO products 
(product_name, department, price, stock_quantity)
VALUES 
('MacBook-Pro', 'Electronics', 60),
('iPad-Pro', 'Electronics', 20),
('Apple-TV', 'Electronics', 100),
('Nike-Socks', 'Apparel', 300),
('Adidas-Socks', 'Apparel', 200),
('Puma-Socks', 'Apparel', 100),
('Abstract-Painting', 'Art', 2),
('Painting-Kit', 'Art', 200),
('Canvas', 'Art', 300),
('Easels', 'Art', 30);

SELECT * FROM products