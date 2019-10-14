## bamazon

## MySQL Database Setup:

In order to run this application, you should have the MySQL database already set up on your machine. In your MySQL, you will be able to create the Bamazon database and the products table with the SQL code found in Bamazon.sql. Run this code inside your MySQL client like Sequel Pro to populate the database, then you will be ready to proceed with running the Bamazon customer and manager interfaces.

## Customer Interface:

Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

The app should then prompt users with two messages.

   * The first should ask the ID of the product you would like to buy.
   * The second message should ask how many units of the product you would like to buy.

Once the customer has placed the order, the application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Not Enough!`, and then prevent the order from going through.

However, if your store _does_ have enough of the product, you should fulfill your order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.


## Manager Interface:

If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.


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