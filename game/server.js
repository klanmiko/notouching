var Room = require('./room.js').Room;
var Player = require('./scene/scene.js').Player;
module.exports.use = function (io) {
    var nsp = io.of('/tutorial');
    nsp.on('connection', function (socket) {

    });
    io.on('connection', function (socket) {

    });
}