// imports
var express = require('express');
var handlebars = require('express-handlebars');

var app = express();

// template engine
app.engine('handlebars', handlebars({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

// static files
app.use(express.static(__dirname + '/public'));

// middleware
app.use((req, res, next) => {
    console.log('Received request on: ' + req.url);
    next();
});

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));

// default route - 404
app.use((req, res) => {
    res.status(404);
    res.type('text/html');
    res.render('404');
});

// error catching - 500
app.use((err, req, res, next) => {
    res.status(500);
    res.render('500');
});

module.exports = app;