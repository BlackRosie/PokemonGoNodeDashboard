var number_of_poly = 0;
var startingMarker;

var pokemoIconBase = '/images//';
var pokemoIconBase = '/images/pokemon_icons/';

//35.918981, 14.489933
///
var defaultLocationX = 0;
var defaultLocationY = 0;

var zoomLevel = 20;
var map;
var startPosition;
var currentPosition;
var radius = 50; //radius in meters
var pokemonIcons;
var socket = io.connect('http://localhost:3000');
var historyMarkers = [];
var fortMarkers = [];
var encounteredPokemonMarkers = [];

function start_hunting() {
    socket.emit("start_hunting");
}


socket.on("sessiondata", function(data) {
    console.info("sessiondata event received. Check the console");
    console.info("sessiondata is ", data);
});

socket.on('messages', function(packet) {
    console.log(packet);
    var newMarker;
    switch (packet.message_type) {
        case "new_position":
            {
                newMarker = addAvatarHistoryMarker(currentPosition);
                historyMarkers.push(newMarker);
                console.log('setting new marker position');
                currentPosition = new google.maps.LatLng(packet.latitude, packet.longitude);
                changeMarkerPosition(startingMarker, currentPosition);
                break;
            }
        case "fort_data":
            {
                for (var i = 0; i < packet.pokestopDataArray.length; i++) {
                    var currentFort = packet.pokestopDataArray[i];
                    var fortLocation = new google.maps.LatLng(currentFort.Latitude, currentFort.Longitude);

                    if (currentFort.FortType !== null) {
                        if (currentFort.Enabled) {
                            newMarker = addPokestopMarker(fortLocation);
                        } else {
                            newMarker = addLuredPokestopMarker(fortLocation);
                        }
                    } else { // Note: it appears that when FortType null Team will be set giving us the correct team gym owner
                        switch (currentFort.Team) {
                            case 1:
                                {
                                    newMarker = addMysticGymMarker(fortLocation);
                                    break;
                                }
                            case 2:
                                {
                                    newMarker = addValorGymMarker(fortLocation);
                                    break;
                                }
                            case 3:
                                {
                                    newMarker = addInstinctGymMarker(fortLocation);
                                    break;
                                }
                        }
                    }
                    fortMarkers.push(newMarker);
                }
                break;
            }
        case "trainer_profile_packet":
            {
                break;
            }
        case "encountered_packet":
            {
                encounteredPokemon = packet.encountered_pokemon;
                var encounteredPokemonLocation = new google.maps.LatLng(encounteredPokemon.Latitude, encounteredPokemon.Longitude);

                newMarker = addEncounteredPokemonMarker(encounteredPokemonLocation, encounteredPokemon.img);
                encounteredPokemonMarkers.push(newMarker);

                break;
            }
    }
});

function addAvatarHistoryMarker(position) {
    return new google.maps.Marker({
        position: position,
        icon: pokemonIcons.FootPrint,
        map: map
    });
}

function addEncounteredPokemonMarker(position, image_url) {
    return new google.maps.Marker({
        position: position,
        icon: {
            url: image_url,
            scaledSize: new google.maps.Size(32, 32)
        },
        map: map
    });
}

function addPokestopMarker(position) {
    return new google.maps.Marker({
        position: position,
        icon: pokemonIcons.Pokestop,
        map: map
    });
}

function addLuredPokestopMarker(position) {
    return new google.maps.Marker({
        position: position,
        icon: pokemonIcons.LuredPokestop,
        map: map
    });
}

function addInstinctGymMarker(position) {
    return new google.maps.Marker({
        position: position,
        icon: pokemonIcons.Instinct,
        map: map
    });
}

function addMysticGymMarker(position) {
    return new google.maps.Marker({
        position: position,
        icon: pokemonIcons.Mystic,
        map: map
    });
}

function addValorGymMarker(position) {
    return new google.maps.Marker({
        position: position,
        icon: pokemonIcons.Valor,
        map: map
    });
}

function changeMarkerPosition(marker, latlong) {
    marker.setPosition(latlong);
    map.panTo(latlong);
}

window.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 37: // Left
            event.preventDefault();
            socket.emit("move_left");
            break;

        case 38: // Up
            event.preventDefault();
            socket.emit("move_up");
            break;

        case 39: // Right
            event.preventDefault();
            socket.emit("move_right");
            break;

        case 40: // Down
            event.preventDefault();
            socket.emit("move_down");
            break;
        case 83: // s
            event.preventDefault();
            socket.emit("map_fort");
            break;
    }
}, false);

function initialize() {
    try {

        socket.on('connect', function(data) {
            socket.emit('join', 'Hello World from client');
        });
        var mapOptions = {
            zoom: zoomLevel
        };

        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        startPosition = new google.maps.LatLng(defaultLocationX, defaultLocationY);
        currentPosition = startPosition;
        map.setCenter(startPosition);

        pokemonIcons = {
            StartMarker: {
                url: '/images/avatar_marker.png',
                scaledSize: new google.maps.Size(32, 32)
            },
            FootPrint: {
                url: '/images/avatar_history.png',
                scaledSize: new google.maps.Size(16, 16)
            },
            LuredPokestop: {
                url: '/images/fort_icons/PstopLured.png',
                scaledSize: new google.maps.Size(16, 16)
            },
            Pokestop: {
                url: '/images/fort_icons/pStop.png',
                scaledSize: new google.maps.Size(16, 16)
            },
            Instinct: {
                url: '/images/fort_icons/Instinct.png',
                scaledSize: new google.maps.Size(20, 20)
            },
            Mystic: {
                url: '/images/fort_icons/Mystic.png',
                scaledSize: new google.maps.Size(20, 20)
            },
            Valor: {
                url: '/images/fort_icons/Valor.png',
                scaledSize: new google.maps.Size(20, 20)
            },
            Horsea: {
                url: pokemoIconBase + '116.png',
                scaledSize: new google.maps.Size(32, 32)
            },
            Goldeen: {
                url: pokemoIconBase + '118.png',
                scaledSize: new google.maps.Size(32, 32)
            },
            Goldeen: {
                url: pokemoIconBase + '118.png',
                scaledSize: new google.maps.Size(32, 32)
            }
        };
        startingMarker = new google.maps.Marker({
            position: startPosition,
            map: map,
            icon: pokemonIcons.StartMarker,
            title: 'Current Location!'
        });
    } catch (e) {
        console.log(e);
    }

}
