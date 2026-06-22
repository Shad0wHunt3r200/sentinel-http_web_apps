'use strict';

const express = require('express');
const app = express();
const PORT = 80;

app.use("/static", express.static("static"))

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Express App</title>
                <script src="/static/script.js"></script>
            </head>
            <body>
                <h1>Hello from Express!</h1>
            </body>
        </html>`);
});

app.get('/joke', (req, res) => {
    res.send('You');
});

app.get('/print', (req, res) => {
    console.log('I was told to print this');
    res.sendStatus(200);
});

app.get('/redirect', (req, res) => {
    res.redirect('/print');
});



app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})