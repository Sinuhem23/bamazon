## bamazon

## MySQL Database Setup:

In order to run this application, you should have the MySQL database already set up on your machine. In your MySQL, you will be able to create the Bamazon database and the products table with the SQL code found in Bamazon.sql. Run this code inside your MySQL client like Sequel Pro to populate the database, then you will be ready to proceed with running the Bamazon customer and manager interfaces.

## Customer Interface:

The customer interface allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located and priced. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.

## Manager Interface:

* If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

* If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

* If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

* If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.


## To run the customer interface: 

```
Please follow the steps below:
git clone https://github.com/Sinuhem23/bamazon.git
```

## Then
```
cd bamazon
npm install
node bamazonCustomer.js
Additionally for managers
node bamazonManager.js
```