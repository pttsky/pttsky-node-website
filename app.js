// imports
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

// dev imports
// const watch = require('node-watch');
// const livereload = require('livereload');
// const app = express();

// template engine
app.engine('handlebars', handlebars({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

// static files
const staticDir = path.join(__dirname, '/public');
app.use(express.static(staticDir));

// dev
// const livereloadSserver = livereload.createServer();
// livereloadSserver.watch(staticDir);
// const webpack = require('webpack'); //to access webpack runtime
// const configuration = require('./webpack.config.js');
// let compiler = webpack(configuration);
// watch(path.join(__dirname, 'public/javascript/src'), () => {
//    compiler.apply(new webpack.ProgressPlugin());
//    compiler.run(function(err, stats) {
//        // ...
//    });
//});

// app.use(webpackDevMiddleware(compiler, {
//      publicPath: '/'
//}));

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