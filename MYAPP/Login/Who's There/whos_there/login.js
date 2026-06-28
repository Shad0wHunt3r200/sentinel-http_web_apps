const express = require('express')

const utils = require('./utils')
const { readUserData } = require('./data')

const router = express.Router()

router.get("/login", (req, res) => {
    const user = req.query.username
    const password = req.query.password

    // User data from JSON file
    const storedData = readUserData()

    /*
    YOUR CODE HERE.
    If the credentials are correct, show the "Log in successful" message.
    Otherwise show "Username or password incorrect" message.
    */

    const userObj = storedData.find(u => u.username === user)

    if (userObj && userObj.password === password) {
        res.send("Log in successful")
    } else {
        res.send("Username or password incorrect")
    }
})

module.exports = router;