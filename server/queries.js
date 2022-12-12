// const db = require('./db');

// const pool = db.pool;

require('dotenv').config()

const Pool = require('pg').Pool;

const pool = new Pool({
  user: "csce315_909_prasad",
  password: "730002297",
  host: "csce-315-db.engr.tamu.edu",
  database: "csce315_909_91",
  port: 5432,
  ssl: {rejectUnauthorized: false}
});


// Get credentials from log in attempt

const getCredentials = (request, response) => {
  const { username, password } = request.body

  pool.query('SELECT * FROM users WHERE username = $1 AND password = $2;', [username, password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


// Get user info by ID

const getUserInfo = (request, response) => {
  const { username } = request.body

  pool.query('SELECT * FROM users WHERE username = $1;', [username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}



// Our first endpoint will be a GET request. 
// Inside the pool.query() we can put the raw SQL that will touch the api database. 
// We’ll SELECT all users and order by id.

const getOrders = (request, response) => {
  pool.query('SELECT * FROM orders LIMIT(5);', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// 

const changePassword = (request, response) => {
  const { username, old_password, updated_password } = request.body

  console.log("UPDATE users SET password = " + updated_password + " WHERE username = " + username + ";");

  pool.query("UPDATE users SET password = $1 WHERE username = $2;", [updated_password, username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// 

const getCart = (request, response) => {
  pool.query("SELECT * FROM cart;", (error, results) => {
    if (error) {
      throw error
    }
  console.log(results.rows)
  response.status(200).json(results.rows)
  })
}

// 

const clearCart = (request, response) => {
  console.log("clearCart start");
  console.log("dropped table");
  let drop = "DROP TABLE cart;"
  let create = "CREATE TABLE IF NOT EXISTS cart ("
                + "cart_item_id SERIAL PRIMARY KEY,"
                + "dish_name VARCHAR(50) NOT NULL,"
                + "protein_name VARCHAR(50),"
                + "ingr1_name VARCHAR(50),"
                + "ingr2_name VARCHAR(50),"
                + "ingr3_name VARCHAR(50),"
                + "ingr4_name VARCHAR(50),"
                + "sauce_name VARCHAR(50),"
                + "have_drink INT DEFAULT 0,"
                + "total_cost NUMERIC(8, 2) ) ;";
  let dropCreate = drop + " " + create;
  pool.query(dropCreate, (error, results) => {
    if (error) {
      throw error
    }
    console.log(results);
    // response.status(201).send(`Cart table recreated`);
  })
  console.log("Recreated cart");
  response.status(201).send(`Cart table recreated`);
}

//

const pushDishToCart = (request, response) => {
  const { dish_name, protein_name, ingr1_name, ingr2_name, ingr3_name, ingr4_name, sauce_name, have_drink, total_cost } = request.body

  // console.log("Got here4");
  console.log(dish_name, protein_name, ingr1_name, ingr2_name, ingr3_name, ingr4_name, sauce_name, have_drink, total_cost );

  pool.query('INSERT INTO cart (dish_name, protein_name, ingr1_name, ingr2_name, ingr3_name, ingr4_name, sauce_name, have_drink, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [dish_name, protein_name, ingr1_name, ingr2_name, ingr3_name, ingr4_name, sauce_name, have_drink, total_cost], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Cart item added`);
  })
}

//

const newDishToCart = (request, response) => {
  const { dish_name } = request.body

  console.log(dish_name);

  let query = "INSERT INTO cart (dish_name, have_drink) VALUES ('" + dish_name + "', 0);";

  console.log(query)

  pool.query(query, (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Dish added`);
  })
}

//

const addIngrToCart = (request, response) => {
  const { col_name, ingredient_name } = request.body

  console.log(col_name, ingredient_name);

  let query = "UPDATE cart SET " + col_name + " = '" + ingredient_name + "' WHERE cart_item_id = (SELECT cart_item_id FROM cart ORDER BY cart_item_id DESC LIMIT(1));";

  pool.query(query, (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Ingredient added`);
  })
}

//

const addDrinkToCart = (request, response) => {
  console.log("add drink")
  
  let query = "UPDATE cart SET have_drink = 1 WHERE cart_item_id = (SELECT cart_item_id FROM cart ORDER BY cart_item_id DESC LIMIT(1));";

  pool.query(query, (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Drink added`);
  })
}

//

const finalizeDish = (request, response) => {
  console.log("finalize dish")

  let drink_price = 1.5;
  
  let query = "UPDATE cart SET total_cost = (SELECT dish_price FROM dish WHERE dish_name = (SELECT dish_name FROM cart WHERE cart_item_id = (SELECT cart_item_id FROM cart ORDER BY cart_item_id DESC LIMIT(1)))) + " + drink_price + " * (SELECT have_drink FROM cart WHERE cart_item_id = (SELECT cart_item_id FROM cart ORDER BY cart_item_id DESC LIMIT(1))) WHERE cart_item_id = (SELECT cart_item_id FROM cart ORDER BY cart_item_id DESC LIMIT(1));";

  pool.query(query, (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Dish finalized`);
  })
}

//

const deleteLastDish = (request, response) => {
  pool.query('DELETE FROM cart WHERE cart_item_id = (SELECT cart_item_id FROM cart ORDER BY cart_item_id DESC LIMIT(1));', (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Last cart item deleted`);
  })
}

//

const nextOrderID = (request, response) => {
  pool.query("SELECT (SELECT order_id FROM orders ORDER BY order_id DESC LIMIT(1)) + 1 AS order_id;", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//

const pushCartItem = (request, response) => {
  const { cart_item_id, dish_name, have_drink, ingr1_name, ingr2_name, ingr3_name, ingr4_name, order_id, protein_name, sauce_name, time, total_cost } = request.body
  
  pool.query('INSERT INTO orders (cart_item_id, dish_name, have_drink, ingr1_name, ingr2_name, ingr3_name, ingr4_name, order_id, protein_name, sauce_name, time, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);', [cart_item_id, dish_name, have_drink, ingr1_name, ingr2_name, ingr3_name, ingr4_name, order_id, protein_name, sauce_name, time, total_cost], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Cart item pushed`);
  })
}

//

const getMains = (request, response) => {
  pool.query("SELECT * FROM dish WHERE dish_type = 'main';", (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)
    response.status(200).json(results.rows)
  })
}

//

const getStarters = (request, response) => {
  pool.query("SELECT * FROM dish WHERE dish_type = 'starter';", (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)
    response.status(200).json(results.rows)
  })
}

//

const getDishType = (request, response) => {
  const dish_id = parseInt(request.params.dish_id)
  
  pool.query('SELECT dish_name, dish_type FROM dish WHERE dish_id = $1', [dish_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//

const getProteins = (request, response) => {
  pool.query("SELECT * FROM inventory WHERE category = 'protein';", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// 

const getToppings = (request, response) => {
  pool.query("SELECT * FROM inventory WHERE category = 'topping';", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// 

const getSauces = (request, response) => {
  pool.query("SELECT * FROM inventory WHERE category = 'sauce';", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//

const getInventory = (request, response) => {
  const { check_ingredient_name } = request.body
  let query = "SELECT * FROM inventory WHERE ingredient_name LIKE '%" + check_ingredient_name + "%';";

  pool.query(query, (error, results) => {
    if (error) {
      throw error
    } 
    console.log(results.rows);
    response.status(200).json(results.rows)
  })
}

//

const getMenu = (request, response) => {
  const { menu_search_term } = request.body
  let query = "SELECT * FROM dish WHERE dish_name LIKE '%" + menu_search_term + "%';";

  pool.query(query, (error, results) => {
    if (error) {
      throw error
    } 
    response.status(200).json(results.rows)
  })
}

//

const addNewUser = (request, response) => {
  const { new_fname, new_lname, new_username, new_password, new_role} = request.body

  // console.log("Got here4");
  console.log(new_fname, new_lname, new_username, new_password, new_role);

  pool.query('INSERT INTO users (username, password, fname, lname, role) VALUES ($1, $2, $3, $4, $5);', [new_username, new_password, new_fname, new_lname, new_role], (error, result) => {
    if (error) {
      throw error
    }
    console.log(result.rows);
    response.status(201).send(`New user added`);
  })
}

//

const addNewDish = (request, response) => {
  const { dish_name, dish_price } = request.body

  console.log(dish_name, dish_price);

  pool.query("INSERT INTO dish (dish_name, dish_price, dish_type) VALUES ($1, $2, $3);", [dish_name, dish_price, "starter"], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`New dish item added`);
  })
}

//

const updateDishPrice = (request, response) => {
  const { dish_name, dish_price } = request.body

  console.log(dish_name, dish_price);

  pool.query("UPDATE dish SET dish_price = $1 WHERE dish_name = $2;", [dish_price, dish_name], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Existing dish price updated`);
  })
}

// Removes dish from dish table, but keeps ingredient in inventory (would keep it in inventory)

const removeDish = (request, response) => {
  const { dish_name, dish_price } = request.body

  console.log(dish_name, dish_price);

  pool.query("DELETE FROM dish WHERE dish_name = $1;", [dish_name], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Existing dish deleted`);
  })
}

//

const addNewInventory = (request, response) => {
  const { dish_name, dish_price } = request.body
  
  console.log(dish_name, dish_price);

  pool.query("INSERT INTO inventory (ingredient_name, stock, restock, location, category) VALUES ($1, $2, $3, $4, $5);", [dish_name, 0, 1000, "fridge", "topping"], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`New inventory item added`);
  })
}

//

const addNewRestock = (request, response) => {
  const { time, ingredient_name, seller_name, cost, num_servings }= request.body
  
  console.log(time, ingredient_name, seller_name, cost, num_servings);

  pool.query("INSERT INTO restock (time, seller_name, ingredient_name, cost, num_servings) VALUES ($1, $2, $3, $4, $5);", [time, seller_name, ingredient_name, cost, num_servings], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`New restock order submitted`);
  })
}

//

const updateInventoryStock = (request, response) => {
  const { ingredient_name, seller_name, cost, num_servings }= request.body
  
  console.log(ingredient_name, num_servings);

  pool.query("UPDATE inventory SET stock = stock + $1 WHERE ingredient_name = $2;", [num_servings, ingredient_name], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Inventory updated`);
  })
}

// 

const getSalesReport = (request, response) => {
  const { s_start_date, s_end_date } = request.body

  pool.query("SELECT * FROM orders WHERE time BETWEEN $1 AND $2;", [s_start_date, s_end_date], (error, results) => {
    if (error) {
      throw error
    } 
    console.log(results.rows);
    response.status(200).json(results.rows)
  })
}

const dishName = (request, response) => {
  const { dish_id } = request.body
  
  pool.query("SELECT dish_name FROM dish WHERE dish_id = $1;", [dish_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)[0].dish_name
  })
}

// 

const getRestockReport = (request, response) => {
  pool.query("SELECT ingredient_name, stock, restock FROM inventory WHERE stock < restock;", (error, results) => {
    if (error) {
      throw error
    } 
    console.log(results.rows);
    response.status(200).json(results.rows)
  })
}

// 

const excessIngredients = (request, response) => {
  pool.query("SELECT ingredient_name, category, stock FROM inventory;", (error, results) => {
    if (error) {
      throw error
    } 
    response.status(200).json(results.rows)
  })
}

//

const excessSalesProtein = (request, response) => {
  const { ingredient_name, category, stock } = request.body

  pool.query("SELECT COUNT(*) FROM orders WHERE protein_name = $1;", [ingredient_name], (error, results) => {
    if (error) {
      throw error
    } 
    response.status(200).json(results.rows)
  })
}

//

const excessSalesSauce = (request, response) => {
  const { ingredient_name, category, stock } = request.body

  pool.query("SELECT COUNT(*) FROM orders WHERE sauce_name = $1;", [ingredient_name], (error, results) => {
    if (error) {
      throw error
    } 
    response.status(200).json(results.rows)
  })
}

//

const excessSalesIngr1 = (request, response) => {
  const { ingredient_name, category, stock } = request.body

  pool.query("SELECT COUNT(*) FROM orders WHERE ingr1_name = $1;", [ingredient_name], (error, results) => {
    if (error) {
      throw error
    } 
    response.status(200).json(results.rows)
  })
}

//

const excessSalesIngr2 = (request, response) => {
  const { ingredient_name, category, stock } = request.body

  pool.query("SELECT COUNT(*) FROM orders WHERE ingr2_name = $1;", [ingredient_name], (error, results) => {
    if (error) {
      throw error
    } 
    response.status(200).json(results.rows)
  })
}

//

const excessSalesIngr3 = (request, response) => {
  const { ingredient_name, category, stock } = request.body

  pool.query("SELECT COUNT(*) FROM orders WHERE ingr3_name = $1;", [ingredient_name], (error, results) => {
    if (error) {
      throw error
    } 
    response.status(200).json(results.rows)
  })
}

//

const excessSalesIngr4 = (request, response) => {
  const { ingredient_name, category, stock } = request.body

  pool.query("SELECT COUNT(*) FROM orders WHERE ingr4_name = $1;", [ingredient_name], (error, results) => {
    if (error) {
      throw error
    } 
    response.status(200).json(results.rows)
  })
}

//

const excessRestocks = (request, response) => {
  const { ingredient_name, category, stock, start_date } = request.body

  pool.query("SELECT SUM(num_servings) FROM restock WHERE ingredient_name = $1 AND time > $2;", [ingredient_name, start_date], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//

const bestComboSales = (request, response) => {
  const { c1Condition, c2Condition } = request.body

  let query = "SELECT COUNT(*) AS sales FROM orders WHERE (" + c1Condition + ") AND (" + c2Condition + ");"

  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


  module.exports = {
    getCredentials,
    getUserInfo,
    getOrders,
    changePassword,
    getCart,
    clearCart,
    pushDishToCart,
    newDishToCart,
    addIngrToCart,
    addDrinkToCart,
    finalizeDish,
    deleteLastDish,
    nextOrderID,
    pushCartItem,
    getMains,
    getStarters,
    getDishType,
    getProteins,
    getToppings,
    getSauces,
    getInventory,
    addNewUser,
    addNewDish,
    addNewInventory,
    updateDishPrice,
    removeDish,
    addNewRestock,
    updateInventoryStock,
    getMenu,
    getSalesReport,
    dishName, 
    getRestockReport,
    excessIngredients,
    excessSalesProtein,
    excessSalesSauce,
    excessSalesIngr1,
    excessSalesIngr2,
    excessSalesIngr3,
    excessSalesIngr4,
    excessRestocks,
    bestComboSales,
  }