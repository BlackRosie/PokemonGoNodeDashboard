var socket = io.connect('http://localhost:3000');

socket.on("sessiondata", function(data) {
    console.info("sessiondata event received. Check the console");
    console.info("sessiondata is ", data);
});

socket.on("logged_in", function(data) {
    console.info("logged_in event received. Check the console");
    console.info("sessiondata after logged_in event is ", data);
    window.location.href = '/';
});

socket.on("logged_out", function(data) {
    console.info("logged_out event received. Check the console");
    console.info("sessiondata after logged_out event is ", data);
});

function login() {
    var username = $('#username').val();
    var password = $('#password').val();
    var provider = $('#provider').val();
    var latitude = $('#latitude').val();
    var longitude = $('#longitude').val();

    var userPacket = {
        username: username,
        password: password,
        provider: provider,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
    };

    socket.emit("login", userPacket);
    // fetch('/login', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         username: username,
    //         password: password,
    //     })
    // });
}



$(window, document, undefined).ready(function() {
    $('select').material_select();

    var $ripples = $('.ripples');

    $ripples.on('click.Ripples', function(e) {

        var $this = $(this);
        var $offset = $this.parent().offset();
        var $circle = $this.find('.ripplesCircle');

        var x = e.pageX - $offset.left;
        var y = e.pageY - $offset.top;

        $circle.css({
            top: y + 'px',
            left: x + 'px'
        });

        $this.addClass('is-active');

    });

    $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
        $(this).removeClass('is-active');
    });

});;
