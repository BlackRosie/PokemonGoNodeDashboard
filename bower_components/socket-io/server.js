var express = require('express');
var app = express();
app.use(express.static(__dirname));
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('connection done');
    setInterval(function () {
        socket.emit('msg', 'hola');
    }, 1000);
});

server.listen(5000);
console.log('magic on port 5000');