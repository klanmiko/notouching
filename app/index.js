var http = require('http');
var express = require('express');
var pointer = require('./app/pointer/index.js');
var bodyparser = require('body-parser');
var app = express();
app.set('views', './app/views');
app.set('view engine', 'pug');
app.use(bodyparser.urlencoded({ extennded: true }));
app.use(bodyparser.json());
var port = process.env.port || 1337;
app.get('/', function (req, res) {
    res.render('index');
});
app.post('/pointer', pointer.route);
http.createServer(app).listen(port);