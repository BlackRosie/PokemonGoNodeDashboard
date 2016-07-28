var fs = require('fs');
var colors = require('colors');
var logger = require('tracer').colorConsole();

var PokemonGO = require('../submodules/poke.io.js');

var method = Trainer.prototype;

function random(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function Trainer(username, password, start_location, provider, socket) {
    try {
        logger.log('creating new trainer');
        logger.log(start_location);
        this.m_username = username;
        this.m_password = password;
        this.m_provider = provider;
        this.m_socket = socket;

        this.m_user = new PokemonGO.Pokeio();

        this.m_defaultLocationX = start_location.coords.latitude;
        this.m_defaultLocationY = start_location.coords.longitude;

        this.m_defaultLocation =
            `${this.m_defaultLocationX}, ${this.m_defaultLocationY}`;
        this.m_steps = 0.000045;
        this.m_hearBeatTime = 5000;

        this.m_normalPokeball = 1;
        this.m_greatPokeball = 2;
        this.m_superPokeball = 3;

        this.m_fortGymType = 0;
        this.m_fortPokestopType = 1;

        this.m_usePokeballType = this.m_normalPokeball;

        this.m_location = {
            type: 'coords',
            coords: {
                latitude: this.m_defaultLocationX,
                longitude: this.m_defaultLocationY,
                altitude: 0,
            }
        };

    } catch (e) {
        logger.log(e);
    }
}

method.createSession = function(callback) {
    var Trainer = this;
    Trainer.m_user.init(Trainer.m_username, Trainer.m_password, Trainer.m_location,
        Trainer.m_provider,
        function(err) {
            if (err) throw err;
            logger.log(
                `http://maps.google.com/maps?z=12&t=m&q=loc:${Trainer.m_location.coords.latitude}+${Trainer.m_location.coords.longitude}`
            );

            logger.log('[i] Current location: ' + Trainer.m_user.playerInfo
                .locationName);
            logger.log('[i] lat/long/alt: : ' + Trainer.m_user.playerInfo
                .latitude +
                ' ' + Trainer.m_user.playerInfo.longitude + ' ' +
                Trainer
                .m_user.playerInfo
                .altitude);

            Trainer.m_user.GetProfile(function(err, profile) {
                if (err) throw err;

                logger.log('[i] profile: ');
                logger.log(profile);
                logger.log('[i] Username: ' + profile.username);
                logger.log('[i] Poke Storage: ' + profile.poke_storage);
                logger.log('[i] Item Storage: ' + profile.item_storage);

                var pokecoin = 0;
                if (profile.currency[0].amount) {
                    pokecoin = profile.currency[0].amount;
                }

                logger.log('[i] Pokecoin: ' + pokecoin);
                logger.log('[i] Stardust: ' + profile.currency[
                    1].amount);
                logger.log('');

                var trainer_profile_packet = {
                    message_type: "trainer_profile_packet",
                    trainer: {
                        username: profile.username,
                        poke_storage: profile.poke_storage,
                        item_storage: profile.item_storage,
                        pokecoin: pokecoin,
                        stardust: profile.currency[1].amount,
                    }
                };
                Trainer.m_socket.sockets.emit("messages",
                    trainer_profile_packet);

                callback();
            });
        });
};

method.buildPokestopData = function() {
    var Trainer = this;
    try {
        Trainer.m_user.Heartbeat(function(err, hb) {
            if (err) {
                logger.log(err);
            }

            try {
                var pokestopDataArray = [];
                for (var i = hb.cells.length - 1; i >= 0; i--) {
                    for (var j = hb.cells[i].Fort.length - 1; j >=
                        0; j--) { // You should check if it is near enough to use!!
                        var fort = hb.cells[i].Fort[j];
                        pokestopDataArray.push(fort);
                        // logger.log(fort);
                        // 0 = GYM
                        // 1 = PokeStop
                        // switch (fort.FortType) {
                        //     case null: // fortType seems to be null when fort is a gym.
                        //         {
                        //             logger.log('is a gym'.blue);
                        //             logger.log(fort);
                        //             break;
                        //         }
                        //     case fortPokestopType:
                        //         {
                        //             logger.log('is a pokestop'.magenta);
                        //             // logger.log(fort);
                        //             break;
                        //         }
                        //     default:
                        //         {
                        //             // logger.log('default'.aqua);
                        //             // logger.log(fort);
                        //
                        //         }
                        // }

                    }
                }

                // TODO: send data to client to map locations
                // logger.log(pokestopDataArray);
                var fort_data_packet = {
                    message_type: "fort_data",
                    pokestopDataArray: pokestopDataArray
                };
                Trainer.m_socket.sockets.emit("messages",
                    fort_data_packet);

            } catch (e) {
                logger.log(e);
            }
        });
    } catch (e) {
        logger.log(e);
    }

};

method.searchForNearbyPokemon = function(hb) {
    try {
        var Trainer = this;
        for (var i = hb.cells.length - 1; i >= 0; i--) {
            if (hb.cells[i].NearbyPokemon[0]) {
                var nearbyPokemon = hb.cells[i].NearbyPokemon[0];
                // logger.log(hb.cells[i].NearbyPokemon[0]);
                var pokemon = Trainer.m_user.pokemonlist[parseInt(
                    nearbyPokemon.PokedexNumber) - 1];
                // logger.log(pokemon);
                logger.log('[+] There is a ' + pokemon.name + ' at ' +
                    nearbyPokemon.DistanceMeters.toString() + ' meters'
                );
            }
        }
    } catch (e) {
        logger.log(e);
    }

};

method.workNearbyPokemonStops = function(hb) {
    try {
        var Trainer = this;
        for (var i = hb.cells.length - 1; i >= 0; i--) {
            for (var j = hb.cells[i].Fort.length - 1; j >= 0; j--) { // You should check if it is near enough to use!!
                var fort = hb.cells[i].Fort[j];
                // logger.log('');
                // logger.log('fort'.white);
                // logger.log(fort);
                // logger.log('');
                if (fort.FortType == 1 && fort.Enabled) {
                    // 1 = PokeStop
                    // 0 = GYM
                    Trainer.m_user.GetFort(fort.FortId, fort.Latitude, fort.Longitude,
                        function(err, fortresponse) {
                            try {
                                if (fortresponse.result == 1) {
                                    // 1 = success
                                    // 2 = out of range ..
                                    logger.log(fort);
                                    logger.log(`${fort.FortId} used!!`.rainbow);
                                } else {
                                    // logger.log(fort.FortId + " out of range!!");
                                }
                            } catch (e) {

                                logger.log(e);
                            }
                        });
                } else {
                    // logger.log("gym!!");
                    // logger.log(fort);
                }
            }
        }
    } catch (e) {
        logger.log(e);
    }
};

method.catchNearbyPokemon = function(hb) {
    try {
        var Trainer = this;
        var currentPokemon;
        var pokedexInfo;
        // Show WildPokemons (catchable) & catch
        for (var i = hb.cells.length - 1; i >= 0; i--) {
            // logger.log(hb.cells[i]);
            for (var j = hb.cells[i].WildPokemon.length -
                    1; j >= 0; j--) { // use async lib with each or eachSeries should be better :)
                try {
                    currentPokemon = hb.cells[i].WildPokemon[
                        j];
                    pokedexInfo = Trainer.m_user.pokemonlist[
                        parseInt(currentPokemon
                            .pokemon.PokemonId) -
                        1];
                } catch (e) {
                    logger.log(e);
                }
            }
        }

        if (pokedexInfo) {
            logger.log('');
            logger.log(colors.rainbow(
                `[+] There is a ${pokedexInfo.name} near!! I can try to catch it!`
            ));
            logger.log(colors.white(`[+] PokedexInfo`));
            logger.log(pokedexInfo);
            logger.log(colors.white(`[+] currentPokemon`));
            logger.log(currentPokemon);
            Trainer.m_user.EncounterPokemon(
                currentPokemon,
                function(suc, dat) {
                    logger.log(
                        'Encountering pokemon ' +
                        pokedexInfo.name +
                        '...');

                    currentPokemon.img = pokedexInfo.img;
                    var encountered_packet = {
                        message_type: "encountered_packet",
                        encountered_pokemon: currentPokemon
                    };
                    Trainer.m_socket.sockets.emit("messages",
                        encountered_packet);

                    Trainer.m_user.CatchPokemon(
                        currentPokemon, 1,
                        1.950, 1,
                        Trainer.m_usePokeballType,
                        function(xsuc, xdat) {
                            var status = [
                                'Unexpected error',
                                'Successful catch',
                                'Catch Escape',
                                'Catch Flee',
                                'Missed Catch'
                            ];
                            try {
                                logger.log(`${status[xdat.Status]}`.rainbow);
                                logger.log('');
                                logger.log(colors.white(`[+] Search the transfer whitelisted pokemon`));
                                // logger.log(colors.white(`[+] Trainer.getTransferWhiteList() total ${Trainer.getTransferWhiteList().length}`));
                                for (var i = 0; i < Trainer.getTransferWhiteList().length; i++) {
                                    // logger.log(colors.white(`[+] check currentPokemon.PokedexTypeId`));
                                    // logger.log(colors.white(`[+] check Trainer.getTransferWhiteList()[i]`));
                                    // logger.log(`${Trainer.getTransferWhiteList()[i]} === ${currentPokemon.PokedexTypeId}`);
                                    // logger.log(currentPokemon);
                                    // logger.log(Trainer.getTransferWhiteList()[i]);
                                    if (Trainer.getTransferWhiteList()[i] === currentPokemon.pokemon.PokemonId) {
                                        logger.log(colors.rainbow(`[+] Found a whitelisted pokemon to transfer`));
                                        Trainer.m_user.TransferPokemon(currentPokemon.pokemon.PokemonId,
                                            function(err, res) {
                                                logger.log(res);
                                            }
                                        );
                                    }
                                }
                            } catch (e) {
                                logger.log(e);
                                logger.log(xsuc);
                                logger.log(xdat);
                            }
                        });
                });
        } else {
            // var randomNumber = random(0, 4);
            // logger.log(randomNumber);
            // TODO: add flag for bot to walk
            // if (randomNumber < 2) {
            //     Trainer.walkRandomDirection(
            //         function(
            //             err, response) {
            //             // logger.log(err);
            //             // logger.log(response);
            //             // logger.log('');
            //         });
            // }
        }
    } catch (e) {
        console.error(e);
    }

};

method.startBot = function() {
    var Trainer = this;
    setInterval(function() {
        Trainer.m_user.Heartbeat(function(err, hb) {
            if (err) {
                logger.log(err);
            }

            try {
                // Search For Pokemon nearby
                Trainer.searchForNearbyPokemon(hb);

                // Work Pokestops
                Trainer.workNearbyPokemonStops(hb);

                // Catcb Pokemon
                Trainer.catchNearbyPokemon(hb);

            } catch (e) {
                logger.log(e);
            }
        });
    }, Trainer.m_hearBeatTime);
};

method.walkDirection = function(direction, callback) {
    try {
        switch (direction) {
            case 'east':
                {
                    this.m_defaultLocationY += this.m_steps;
                    break;
                }
            case 'west':
                {
                    this.m_defaultLocationY -= this.m_steps;
                    break;
                }
            case 'south':
                {
                    this.m_defaultLocationX -= this.m_steps;
                    break;
                }
            case 'north':
                {
                    this.m_defaultLocationX += this.m_steps;
                    break;
                }
        }

        this.m_defaultLocation = `${this.m_defaultLocationX}, ${this.m_defaultLocationY}`;

        this.m_location = {
            type: 'coords',
            coords: {
                latitude: this.m_defaultLocationX,
                longitude: this.m_defaultLocationY,
                altitude: 0,
            }
        };

        // logger.log('set new location: ', location);
        // logger.log(`(${location.coords.latitude},${location.coords.longitude})`);
        var move_packet = {
            message_type: "new_position",
            latitude: this.m_location.coords.latitude,
            longitude: this.m_location.coords.longitude,
        };
        this.m_socket.sockets.emit("messages", move_packet);

        logger.log(`http://maps.google.com/maps?z=12&t=m&q=loc:${this.m_location.coords.latitude}+${this.m_location.coords.longitude}`);

        this.m_user.SetLocation(this.m_location, callback);
    } catch (e) {
        logger.log(e);
    }
};

method.walkRandomDirection = function(callback) {
    logger.log('');
    // var directions = ['north', 'south', 'east', 'west'];
    var directions = ['south', 'south', 'east', 'west'];
    var randomDirection = random(0, 4);
    var newDirection = directions[randomDirection];
    // logger.log(colors.cyan('walking %s'), newDirection);
    switch (newDirection) {
        case 'east':
            {
                this.m_defaultLocationY += this.m_steps;
                break;
            }
        case 'west':
            {
                this.m_defaultLocationY -= this.m_steps;
                break;
            }
        case 'south':
            {
                this.m_defaultLocationX -= this.m_steps;
                break;
            }
        case 'north':
            {
                this.m_defaultLocationX += this.m_steps;
                break;
            }
    }
    this.m_defaultLocation =
        `${this.m_defaultLocationX}, ${this.m_defaultLocationY}`;

    this.m_location = {
        type: 'coords',
        coords: {
            latitude: this.m_defaultLocationX,
            longitude: this.m_defaultLocationY,
            altitude: 0,
        }
    };

    // logger.log('set new location: ', location);
    // logger.log(`(${location.coords.latitude},${location.coords.longitude})`);
    var move_packet = {
        message_type: "new_position",
        latitude: this.m_location.coords.latitude,
        longitude: this.m_location.coords.longitude,
    };
    this.m_socket.sockets.emit("messages", move_packet);

    logger.log(`http://maps.google.com/maps?z=12&t=m&q=loc:${this.m_location.coords.latitude}+${this.m_location.coords.longitude}`);

    this.m_user.SetLocation(this.m_location, callback);
};

method.getTransferWhiteList = function() {
    // TODO: quick test list, pull list from user couchbase document when finished
    var pokemonLIST = {
        Shellder: 90,
        Weedle: 13,
        Caterpie: 10,
        Zubat: 41,
        Voltorb: 100,
        Sandshrew: 27,
        Spearow: 21,
        Staryu: 120,
        Horsea: 116,
        Nidoran: 32
    };
    return [
        pokemonLIST.Shellder,
        pokemonLIST.Weedle,
        pokemonLIST.Caterpie,
        pokemonLIST.Zubat,
        pokemonLIST.Voltorb,
        pokemonLIST.Sandshrew,
        pokemonLIST.Spearow,
        pokemonLIST.Staryu,
        pokemonLIST.Horsea,
        pokemonLIST.Nidoran
    ];

};


module.exports = Trainer;
