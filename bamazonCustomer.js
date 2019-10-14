var mysql = require('mysql');
var inquirer = require('inquirer');

// create connection
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : "",
    database : 'bamazon_DB'
   
});
// validataInput makes sure that the user is supplying positive INT
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;

    }else{
        return 'Whole number is needed, try again.(Can not be zero.)';
    }
}

// Item/quantity
function purchasePrompt(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: "Please enter the ID of the item you desire.",
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like?',
            validate: validateInput,
            filter: Number
        }
    ]).then(function(input){
        var item = input.item_id;
        var quantity = input.quantity;

        var queryString = 'SELECT * FROM products WHERE ?';

        db.query(queryString, {item_id: item}, function(err, data) {
            if (err) throw err;

            if (data.length === 0){
                console.log("ERROR: The Item ID entered is invalid. Please try again.");
                displayInventory();
            }else {
                var productData = data[0];
                // If quantity requested is in stock
              if (quantity <= productData.stock_quantity){
                  console.log ('Your in LUCK! Your requested product is in stock! Order is now in progress.');
                  
                //   Updating query string

                var updatingQueryString ='UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                db.query (updatingQueryString, function(err, data) {
                    if (err) throw err;

                    console.log('Its READY! your total is $' + productData.price * quantity);
                    console.log('Thank You! Please come again!');
                    console.log("\n-----------------------------------------------------------\n");

                    // Ending Database
                    db.end();
                })
                }else {
                    console.log('OH NO! There is not enough in stock. Your order was not placed.');
                    console.log('Please retry');
                    console.log ('\n-------------------------------------------------------\n');
                    displayInventory();
                }  
            }
        })
    })
}

// Current inventory from db then display output in console

function displayInventory() {
    queryString = 'SELECT * FROM products';

    // db query
db.query(queryString, function (err, data) {
    if (err) throw err;
    console.log("Current Inventory:");
    console.log(".................\n");

     var stringOutPut = '';
     for (var i = 0; i < data.length;i++) {
         stringOutPut = '';
         stringOutPut += 'Item ID: ' + data[i].item_id + ' // ';
         stringOutPut += 'Product Name: ' + data[i].product_name + ' // ';
         stringOutPut += 'Department: ' + data[i].price + '\n';
         
         console.log(stringOutPut);
     }
     console.log("--------------------------------------------\n");

    //  Prompt the user for item/quantity they would like to purchase
    purchasePrompt();
})
}
// execute main app logic and display available inventory
function runBamazon() {
    displayInventory();
}
// Run app logic
runBamazon();