var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

// create connection
var db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_DB"
});
function promptManagerAction() {
  // Prompt the manager to select an option
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: chalk.cyan("Please select an option:"),
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ],
        filter: function(val) {
          if (val === "View Products for Sale") {
            return "sale";
          } else if (val === "View Low Inventory") {
            return "lowInventory";
          } else if (val === "Add to Inventory") {
            return "addInventory";
          } else if (val === "Add New Product") {
            return "newProduct";
          } else {
            // This case should be unreachable
            console.log(chalk.bgRed.white("ERROR: Unsupported operation!"));
            exit(1);
          }
        }
      }
    ])
    .then(function(input) {
      // Trigger the appropriate action based on the user input
      if (input.option === "sale") {
        displayInventory();
      } else if (input.option === "lowInventory") {
        displayLowInventory();
      } else if (input.option === "addInventory") {
        addInventory();
      } else if (input.option === "newProduct") {
        createNewProduct();
      } else {
        // This case should be unreachable
        console.log(chalk.bgRed.white("ERROR: Unsupported operation!"));
        exit(1);
      }
    });
}

// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {
  // Construct the db query string
  queryStr = "SELECT * FROM products";

  // Make the db query
  db.query(queryStr, function(err, data) {
    if (err) throw err;

    console.log(chalk.green("Existing Inventory: "));
    console.log("...................\n");

    var strOut = "";
    for (var i = 0; i < data.length; i++) {
      strOut = "";
      strOut += chalk.red("Item ID: ") + data[i].item_id + chalk.green(" // ");
      strOut += chalk.red("Product Name: ") + data[i].product_name + chalk.green(" // ");
      strOut += chalk.red("Department: ") + data[i].department_name + chalk.green(" // ");
      strOut += chalk.red("Price: ") + "$" + data[i].price + chalk.green("  //  ");
      strOut += chalk.red("Quantity: ") + data[i].stock_quantity + "\n";

      console.log(chalk.yellow(strOut));
    }

    console.log(
      "---------------------------------------------------------------------\n"
    );

    // End the database connection
    db.end();
  });
}

// displayLowInventory will display a list of products with the available quantity below 100
function displayLowInventory() {
  // Construct the db query string
  queryStr = "SELECT * FROM products WHERE stock_quantity < 100";

  // Make the db query
  db.query(queryStr, function(err, data) {
    if (err) throw err;

    console.log(chalk.bgWhite.red("Low Inventory Items (below 100): "));
    console.log("................................\n");

    var strOut = "";
    for (var i = 0; i < data.length; i++) {
      strOut = "";
      strOut +=
        chalk.red.bold("Item ID: ") + chalk.yellow(data[i].item_id) + "  //  ";
      strOut +=
        chalk.red.bold("Product Name: ") +
        chalk.yellow(data[i].product_name) +
        "  //  ";
      strOut +=
        chalk.red.bold("Department: ") +
        chalk.yellow(data[i].department_name) +
        "  //  ";
      strOut +=
        chalk.red.bold("Price: $") + chalk.yellow(data[i].price) + "  //  ";
      strOut +=
        chalk.red.bold("Quantity: ") +
        chalk.yellow(data[i].stock_quantity) +
        "\n";

      console.log(strOut);
    }

    console.log(
      "---------------------------------------------------------------------\n"
    );

    // End the database connection
    db.end();
  });
}

// validateInteger makes sure that the user is supplying only positive integers for their inputs
function validateInteger(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && sign === 1) {
    return true;
  } else {
    return chalk.bgWhite.green("Please enter a whole non-zero number.");
  }
}

// validateNumeric makes sure that the user is supplying only positive numbers for their inputs
function validateNumeric(value) {
  // Value must be a positive number
  var number = typeof parseFloat(value) === "number";
  var positive = parseFloat(value) > 0;

  if (number && positive) {
    return true;
  } else {
    return chalk.bgWhite.green(
      "Please enter a positive number for the unit price."
    );
  }
}

// addInventory will guilde a user in adding additional quantify to an existing item
function addInventory() {
  // Prompt the user to select an item
  inquirer
    .prompt([
      {
        type: "input",
        name: "item_id",
        message: chalk.magenta(
          "Please enter the Item ID for stock_count update."
        ),
        validate: validateInteger,
        filter: Number
      },
      {
        type: "input",
        name: "quantity",
        message: chalk.yellow("How many would you like to add?"),
        validate: validateInteger,
        filter: Number
      }
    ])
    .then(function(input) {
      var item = input.item_id;
      var addQuantity = input.quantity;

      // Query db to confirm that the given item ID exists and to determine the current stock_count
      var queryStr = "SELECT * FROM products WHERE ?";

      db.query(queryStr, { item_id: item }, function(err, data) {
        if (err) throw err;

        if (data.length === 0) {
          console.log(
            chalk.bgRed.white.bold(
              "ERROR: Invalid Item ID. Please select a valid Item ID."
            )
          );
          addInventory();
        } else {
          var productData = data[0];

          console.log(chalk.bgGreen.white("Updating Inventory..."));

          // Construct the updating query string
          var updateQueryStr =
            "UPDATE products SET stock_quantity = " +
            (productData.stock_quantity + addQuantity) +
            " WHERE item_id = " +
            item;

          // Update the inventory
          db.query(updateQueryStr, function(err, data) {
            if (err) throw err;

            console.log(
              chalk.blueBright(
                "Stock count for Item ID " +
                  item +
                  " has been updated to " +
                  (productData.stock_quantity + addQuantity) +
                  "."
              )
            );
            console.log(
              "\n---------------------------------------------------------------------\n"
            );

            // End the database connection
            db.end();
          });
        }
      });
    });
}

// createNewProduct will guide the user in adding a new product to the inventory
function createNewProduct() {
  // Prompt the user to enter information about the new product
  inquirer
    .prompt([
      {
        type: "input",
        name: "product_name",
        message: chalk.green.bold("Please enter the new product name.")
      },
      {
        type: "input",
        name: "department_name",
        message: chalk.cyan.bold(
          "Which department does the new product belong to?"
        )
      },
      {
        type: "input",
        name: "price",
        message: chalk.green.bold("What is the price per unit?"),
        validate: validateNumeric
      },
      {
        type: "input",
        name: "stock_quantity",
        message: chalk.yellow.bold("How many items are in stock?"),
        validate: validateInteger
      }
    ])
    .then(function(input) {
      console.log(
        chalk.magenta.bold("Adding New Item:") +
          chalk.cyanBright.bold("\n    product_name = ") +
          chalk.yellow(input.product_name + "\n") +
          chalk.cyanBright.bold("    department_name = ") +
          chalk.yellow(input.department_name + "\n") +
          chalk.cyanBright.bold("    price = ") +
          chalk.yellow(input.price + "\n") +
          chalk.cyanBright.bold("    stock_quantity = ") +
          chalk.yellow(input.stock_quantity)
      );

      // Create the insertion query string
      var queryStr = "INSERT INTO products SET ?";

      // Add new product to the db
      db.query(queryStr, input, function(error, results, fields) {
        if (error) throw error;

        console.log(
          chalk.blue(
            "New product has been added to the inventory under Item ID " +
              results.insertId +
              "."
          )
        );
        console.log(
          "\n---------------------------------------------------------------------\n"
        );

        // End the database connection
        db.end();
      });
    });
}

// runBamazon will execute the main application logic
function runBamazon() {
  // Prompt manager for input
  promptManagerAction();
}

// Run the application logic
runBamazon();

// //   * List a set of menu options:

// //   * View Products for Sale

// //   * View Low Inventory

// //   * Add to Inventory

// //   * Add New Product

// // * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

// // * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

// // * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

// // * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
