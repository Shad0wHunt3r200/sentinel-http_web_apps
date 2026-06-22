const express = require("express");

const PORT = 80;

const app = express();

// Prices
const PRICES = {
  size: { s: 10, l: 15, xl: 20 },
  topping: 2,
  extra_cheese: 3,
  cheese_crust: 3,
};

// Valid topping choices
const validToppings = ["Onion", "Tempeh", "Olives", "Pineapple", "Durian"];

//Homepage
app.get("/", (req, res) => {
  res.send("Hello from Express Pizza");
});

// Route to handle pizza orders
app.get("/order", (req, res) => {
  const { size, topping1, topping2, extra_cheese, cheese_crust } = req.query;
  console.log("Received order:", req.query);
 
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
 
  // Send the response
  res.send(
    `Thank you for ordering from Express Pizza! Your total is: $${total}`,
  );
});
 
// Test order: /order?size=s&topping1=Onion&extra_cheese=1&cheese_crust=1
// Test invalid order: order?size=m
 
// Start the server
app.listen(PORT, () => {
  console.log(`Pizza ordering server running on port ${PORT}`);
});