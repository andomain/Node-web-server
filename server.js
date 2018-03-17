const express = require('express');

const app = new express();

app.get('/', (req, res) => {
    res.send({
        name: 'Sam',
    })
});

app.get('/about', (req, res) => {
    res.send('About page');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error handling request',
    });
});

app.listen(3000);