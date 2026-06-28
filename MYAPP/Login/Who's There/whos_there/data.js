const fs = require('fs')

function readUserData() {
    const data = fs.readFileSync('store.json', 'utf8')
    
    return JSON.parse(data)
}

module.exports = { readUserData }