const express = require('express')

const utils = require('./utils')
const userData = require('./data')

const router = express.Router()

router.get("/login", (req, res) => {
    return res.render("login")
})

router.post("/login", (req, res) => {
    const { username, password } = req.body
    
    // Check if username exists and password matches
    if (userData[username] && userData[username] === password) {
        return res.send("Logged in successfully!")
    } else {
        return res.send("Invalid username or password given!")
    }
})

module.exports = router;