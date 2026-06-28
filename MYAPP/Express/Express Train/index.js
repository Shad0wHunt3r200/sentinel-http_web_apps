'use strict';

const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Express App</title>
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

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})