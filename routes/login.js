var express = require('express');
var router = express.Router();

var returnRouter = function(io) {
    /* GET users listing. */
    router.get('/', function(req, res, next) {

        res.render('login', {
            title: 'Login'
        });
    });

    router.post('/', function(req, res, next) {
        console.log("Requested /login");
        console.log(req.body);

        req.session.user = {
            username: req.body.username,
            password: req.body.password,
            provider: req.body.provider
        };
        //req.session.save();
        res.redirect("/");
    });
    return router;
};

module.exports = returnRouter;
