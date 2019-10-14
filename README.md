# bamazon

#MySQL Database Setup:

In order to run this application, you should have the MySQL database already set up on your machine. In your MySQL, you will be able to create the Bamazon database and the products table with the SQL code found in Bamazon.sql. Run this code inside your MySQL client like Sequel Pro to populate the database, then you will be ready to proceed with running the Bamazon customer and manager interfaces.

#Customer Interface:
```
The customer interface allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located and priced. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.
```

#To run the customer interface: 

```
Please follow the steps below:
git clone https://github.com/Sinuhem23/bamazon.git
```

#Then
```
cd bamazon
npm install
node bamazonCustomer.js
```