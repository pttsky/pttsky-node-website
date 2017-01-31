// imports
var express = require('express');
var handlebars = require('express-handlebars');
var path = require('path');
// var livereload = require('livereload');

var app = express();

// template engine
app.engine('handlebars', handlebars({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

// static files
var staticDir = path.join(__dirname, '/public');
app.use(express.static(staticDir));

// livereload
// var livereloadSserver = livereload.createServer();
// livereloadSserver.watch(staticDir);

// my first middleware
app.use(function(req, res, next) {
    console.log('Received request on: ' + req.url);
    next();
});

// routes
app.get('/', function(req, res) {
    res.render('home');
});
app.get('/about', function(req, res) {
    res.render('about');
});

// default route - 404
app.use(function(req, res) {
    res.status(404);
    res.type('text/html');
    res.render('404');
});

// error catching - 500
app.use(function(err, req, res, next) {
    res.status(500);
    res.render('500');
});

module.exports = app;