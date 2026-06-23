const express = require("express");
 
const PORT = 80;
 
const app = express();

const path = require("path");

app.use(express.static(path.join(__dirname)));
 
// Prices
const PRICES = {
  size: { s: 10, l: 15, xl: 18 },
  topping: 2,
  extra_cheese: 1.50,
  cheese_crust: 2.50,
};
 
// Valid topping choices
const validToppings = ["Onion", "Tempeh", "Olives", "Pineapple", "Durian"];
 
// Middleware to parse URL-encoded form data (from POST requests)
app.use(express.urlencoded({ extended: true }));
 
//Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
 
// Route to handle pizza orders 
app.post("/order", (req, res) => { // when a POST request is made to /order, this function will be called
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