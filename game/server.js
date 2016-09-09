var Scene = require('./scene/scene.js').Scene;
var Player = require('./scene/scene.js').Player;
var Button = require('./scene/scene.js').Button;
var Cookie = require('cookie');
var mainScene = new Scene(1000,1000,new Button(500,500));
module.exports.use = function (io) {
    io.on('connection', function (socket) {
        var cookie = Cookie.parse(socket.request.headers.cookie);
        console.dir(cookie);
        var player = mainScene.getPlayerByID(cookie.id);
        if (!player) {
            player = new Player(cookie.id, 500, 500);
            mainScene.addPlayer(player);
        }
        console.log("connection Established with " + player.id);
        io.emit('load', {width:mainScene.width,height:mainScene.height,button:mainScene.button,players:mainScene.players});
        socket.on('move', function (data) {
            player.x = data.x;
            player.y = data.y;
            io.volatile.emit('move', data);
        });
        socket.on('click', function () {
            mainScene.onClick(player, function (event, data) {
                io.emit(event, data);
            });
        });
        socket.on('disconnect', function () {
            io.emit('player-disconnect', player.id);
            mainScene.removePlayer(player.id);
        });
    });
};