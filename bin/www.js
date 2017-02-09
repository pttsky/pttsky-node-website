#!/usr/bin/env node

const http = require('http');
const app = require('../app');
const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);
app.disable('x-powered-by');

const server = http.createServer(app);

server.listen(port);
server.on('listening', function() {
    console.log('Server started listening on ' + port)
});

// Normalize a port into a number, string, or false
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}