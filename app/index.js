var secret = "secret";
var http = require('http');
var express = require('express');
var cookies = require('cookie-parser');
var pointer = require('./app/pointer/index.js');
var tutorial = require('./tutorial/index.js');
var score = require('./score/index.js');
var bodyparser = require('body-parser');
var app = express();
app.set('views', './app/views');
app.set('view engine', 'pug');
app.use(bodyparser.urlencoded({ extennded: true }));
app.use(bodyparser.json());
app.use(cookies(secret));
var port = process.env.port || 1337;
app.get('/', function (req, res) {
    if (!req.cookies.id) {
        //TODO setup of id with database query
        res.redirect('/tutorial');
        return;
    }
    res.render('index');
});
app.use('/pointer', pointer.route);
app.use('/tutorial', tutorial.route);
app.use('/score', score.route);
http.createServer(app).listen(port);