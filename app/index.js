var secret = "secret";
var idgen = require('shortid');
var http = require('http');
var express = require('express');
var cookies = require('cookie-parser');
var bodyparser = require('body-parser');
var app = express();
var game = require('../game/server.js');
var port = process.env.PORT || 80;

app.set('views', './app/views');
app.set('view engine', 'pug');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('./app/views/static'));
app.use(bodyparser.urlencoded({ extennded: true }));
app.use(bodyparser.json());
app.use(cookies(secret));

app.get('/', function (req, res) {
    var id = req.cookies.id;
    if (!id) {
        //TODO setup of id with database query
        id = idgen.generate();
        res.cookie('id', id);
    }
    res.render('index', { width: 1000, height: 1000});
});

var frontEnd = http.Server(app);
var io = require('socket.io')(frontEnd);
game.use(io);
frontEnd.listen(port);