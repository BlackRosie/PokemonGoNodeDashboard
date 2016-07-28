var express = require('express');
var http = require('http');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/bower_components'));


var session = require("express-session")({
    secret: "Pokemon-GO",
    resave: true,
    saveUninitialized: true
});
var sharedsession = require("express-socket.io-session");
app.use(session);

/**
 * Create HTTP server.
 */

// TODO create socket manager
var server = http.createServer(app);
socketio = require('socket.io')(server);
socketio.use(sharedsession(session, {
    autoSave: true
}));

var Trainer = require('./source/Trainer.js');
var trainer;
var defaultLocationX = 26.615511;
var defaultLocationY = -81.870117;

location = {
    type: 'coords',
    coords: {
        latitude: defaultLocationX,
        longitude: defaultLocationY,
        altitude: 0,
    }
};

socketio.on("connection", function(socket) {
    console.log("Emitting session data");
    socket.emit("sessiondata", socket.handshake.session);

    // Unset session data via socket
    socket.on("start_hunting", function() {
        console.log("start_huntring message");
        console.log("start hunting");
        if (trainer !== undefined) {
            trainer.startBot();
        }

    });

    socket.on("map_fort", function() {
        console.log("map_fort message");
        if (trainer !== undefined) {
            trainer.walkDirection("west", function(err, response) {
                // trainer.buildPokestopData();
                trainer.buildPokestopData();

            });
        }
    });

    socket.on("move_left", function() {
        console.log("move_left message");
        if (trainer !== undefined) {
            trainer.walkDirection("west", function(err, response) {
                // trainer.buildPokestopData();

            });
        }
    });
    socket.on("move_right", function() {
        console.log("move_right message");
        if (trainer !== undefined) {
            trainer.walkDirection("east", function(err, response) {
                // trainer.buildPokestopData();

            });
        }
    });
    socket.on("move_up", function() {
        console.log("move_up message");
        if (trainer !== undefined) {
            trainer.walkDirection("north", function(err, response) {

            });
        }
    });
    socket.on("move_down", function() {
        console.log("move_down message");
        if (trainer !== undefined) {
            trainer.walkDirection("south", function(err, response) {
                // trainer.buildPokestopData();

            });
        }
    });

    // Set session data via socket
    socket.on("login", function(msg) {
        console.log("Received login message");
        console.log(msg);
        socket.handshake.session.user = {
            username: msg.username,
            password: msg.password,
            provider: msg.provider,
            latitude: msg.latitude,
            longitude: msg.longitude,

        };
        console.log("socket.handshake session data is %j.", socket.handshake.session);
        var user = socket.handshake.session.user;

        defaultLocationX = msg.latitude;
        defaultLocationY = msg.longitude;
        location = {
            type: 'coords',
            coords: {
                latitude: defaultLocationX,
                longitude: defaultLocationY,
                altitude: 0,
            }
        };

        trainer = new Trainer(user.username, user.password, location, user.provider, socketio);
        trainer.createSession(function() {
            trainer.buildPokestopData();
        });
        // socket.handshake.session.save();
        //emit logged_in for debugging purposes of this example
        socket.emit("logged_in", socket.handshake.session);
    });

    // Unset session data via socket
    socket.on("logout", function() {
        console.log("Received logout message");
        socket.handshake.session.user = {};
        delete socket.handshake.session.logged;
        // socket.handshake.session.save();
        //emit logged_out for debugging purposes of this example
        console.log("socket.handshake session data is %j.", socket.handshake.session);

        socket.emit("logged_out", socket.handshake.session);
    });



});

/**
 * Create Routes server.
 */

var indexRoute = require('./routes/index')(socketio);
var loginRoute = require('./routes/login')(socketio);
app.use('/', indexRoute);
app.use('/login', loginRoute);


//Debugging express
app.use("*", function(req, res, next) {
    console.log("Express `req.session` data is %j.", req.session);
    next();
});
// Debugging socketio
socketio.use(function(socket, next) {
    console.log("socket.handshake session data is %j.", socket.handshake.session);
    next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);



/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

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

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

module.exports = app;
