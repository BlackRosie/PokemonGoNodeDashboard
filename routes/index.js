var express = require('express');
var request = require('request');
var router = express.Router();
var colors = require('colors');
var fs = require('fs');
var colors = require('colors');
var logger = require('tracer').colorConsole();

var PokemonGO = require('../submodules/poke.io.js');
var Trainer = require('../source/Trainer.js');

function downloadPokemonImage(pokemonData, callback) {
    logger.log('[i] pokemonData: ' + pokemonData);
    var image_url = pokemonData.img;
    var n = pokemonData.img.lastIndexOf('/');
    var filename = pokemonData.img.substring(n + 1);
    filename = './public/images/pokemon_icons/' + filename;
    request.head(image_url, function(err, res, body) {
        if (err) callback(err, filename);
        else {
            var stream = request(image_url);
            stream.pipe(
                    fs.createWriteStream(filename)
                    .on('error', function(err) {
                        callback(error, filename);
                        stream.read();
                    })
                )
                .on('close', function() {
                    callback(null, filename);
                });
        }
    });
}


/* GET home page. */
var returnRouter = function(io) {
    router.get('/', function(req, res, next) {
        try {
            console.log(req.session);

            if (req.session.user === undefined || req.session.user.username === undefined) {
                console.log('redirecting to login');
                return res.redirect('/login');
            }

            console.log('valid user');
            console.log(req.session.user.username);

            res.render('index', {
                title: 'Express'
            });

        } catch (e) {
            logger.log(e);
        }
    });

    router.post('/', function(req, res, next) {
        try {

            var params = req.param;
            var body = req.body;

            console.log(params);
            console.log(body);

            res.render('index', {
                title: 'Express'
            });

        } catch (e) {
            logger.log(e);
        }
    });
    return router;
};

module.exports = returnRouter;
