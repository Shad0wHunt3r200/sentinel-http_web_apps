const express = require("express");
const router = express.Router();

const path = require("path");

// Prices
const PRICES = {
  size: { s: 10, l: 15, xl: 18 },
  topping: 2,
  extra_cheese: 1.50,
  cheese_crust: 2.50,
};
 
// Valid topping choices
const validToppings = ["Onion", "Tempeh", "Olives", "Pineapple", "Durian"];

const orders = {};
let nextOrderId = 1;

//Homepage
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

//Order form
router.get("/order", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
   
    // Route to handle pizza orders 
router.post("/order", (req, res) => { // when a POST request is made to /order, this function will be called
    const { size, topping1, topping2, extra_cheese, cheese_crust } = req.body;
    console.log("Received order:", req.body);

    // Validate size (400 is bad request)
    if (!PRICES.size[size]) {
    return res.status(400).send(`Invalid size. Please choose s, l, or xl.`); 
    }

    // Validate toppings
    if (topping1 && !validToppings.includes(topping1)) {
    return res
        .status(400)
        .send(`Invalid topping1. Choose from: ${validToppings.join(", ")}.`);
    }
    if (topping2 && !validToppings.includes(topping2)) {
    return res
        .status(400)
        .send(`Invalid topping2. Choose from: ${validToppings.join(", ")}.`);
    }

    // Validate extra cheese (optional)
    if (extra_cheese && !["1", "0"].includes(extra_cheese)) {
    return res
        .status(400)
        .send(`Invalid extra_cheese value. Use 1 (yes) or 0 (no).`);
    }

    // Validate cheese crust (optional)
    if (cheese_crust && !["1", "0"].includes(cheese_crust)) {
    return res
        .status(400)
        .send(`Invalid cheese_crust value. Use 1 (yes) or 0 (no).`);
    }

    // Calculate the total price
    let total = PRICES.size[size]; // Base price based on size

    if (topping1) total += PRICES.topping;
    if (topping2) total += PRICES.topping;
    if (extra_cheese === "1") total += PRICES.extra_cheese;
    if (cheese_crust === "1") total += PRICES.cheese_crust;

    const orderId = nextOrderId++;
    orders[orderId] = {
        size,
        topping1,
        topping2,
        extra_cheese,
        cheese_crust,
        total
    };

    // Send the response
    res.send(
    `Thank you for ordering from Express Pizza! Your order number is ${orderId}. Your total is: $${total}`,
    );
});

router.get("/review/:orderid", (req, res) => {
    let orderid = req.params.orderid;
    const order = orders[orderid];

    if (!order) return res.status(404).send(`Order ${orderid} not found.`);

    if (order.topping1 && order.topping2) {
        toppings = order.topping1 + ", " + order.topping2;
      } else if (order.topping1) {
        toppings = order.topping1;
      } else if (order.topping2) {
        toppings = order.topping2;
      } else {
        toppings = "No toppings selected";
      }
      
      let crust = "No crust selected";
      if (order.extra_cheese === "1" && order.cheese_crust === "1") {
        crust = "Extra cheese, Cheese crust";
      } else if (order.extra_cheese === "1") {
        crust = "Extra cheese";
      } else if (order.cheese_crust === "1") {
        crust = "Cheese crust";
      } else {
        crust = "No crust selected";
      }
      
      const price = order.total;

    res.send(`<h1>Order ${orderid}:</h1>
        <h2>Toppings:</h2>
        <p>${toppings}</p>
        <h2>Crust/Extra Cheese:</h2>
        <p>${crust}</p>
        <h2>Total: $${price}</h2>`);
});

module.exports = router;