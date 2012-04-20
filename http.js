var express = require('express');
var WebSocketServer = require('ws').Server;
var app = express.createServer();


app.configure(function () {
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

var wss = new WebSocketServer({server: app});
wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('received: %s', message);
    });
    ws.send('something');
});


console.log("http://localhost:3000");
app.listen(3000);