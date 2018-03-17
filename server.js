const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const isMaintenance = false;

const app = new express();

// Register partials directory 
hbs.registerPartials(__dirname + '/views/partials');

// Use hbs/handlebars
app.set('view engine', 'hbs');

// Logger middleware
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + "\n", (err) => {
        if(err) {
            console.log('Unabled to append server.log');
        }
    });
    next();
});

// Site maintenance mode middleware
app.use((req, res, next) => {
    if(isMaintenance){
        res.render('maintenance.hbs');
    } else {
        next();
    }
});

// Static views
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the website!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});