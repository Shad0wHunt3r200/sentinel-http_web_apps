const express = require("express");
const routes = require('./routes')
const path = require("path");
 
const PORT = 80; 
const app = express();

// Middleware to parse URL-encoded form data (from POST requests)
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

app.use(routes);
 
// Start the server
app.listen(PORT, () => {
  console.log(`Pizza ordering server running on port ${PORT}`);
});