const express = require('express');
const app = express();
const PORT = 80;

app.get('/', (req, res) => {
    res.send('Hello! This is the homepage');
});

app.get('/secret', (req, res) => {
    const secret = req.query.secret;

    if (secret == 'Biryani') {
        res.send('Yum!');
    } else {
        res.sendStatus(404);
    };
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})