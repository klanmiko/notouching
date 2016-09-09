var idgen = require('shortid');
var SHRINK_RATE = 0.8;
module.exports.Button = function (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width || 100;
    this.height = height || 100;
};
var players = 1;
module.exports.Player = function (id, x, y, name) {
    this.id = id || idgen.generate();
    this.name = name || "player" + players;
    this.x = x || 0;
    this.y = y || 0;
    players++;
};
module.exports.Scene = function (width, height, button) {
    this.width = width;
    this.height = height;
    this.button = button;
    this.players = [];
    this.getPlayerByID = function (id) {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].id == id) {
                return this.players[i];
            }
        }
    };
    this.addPlayer = function (player) {
        if (isPlayer(player)) {
            for (var i = 0; i < this.players.length; i++) {
                if (this.players[i].id == player.id) {
                    return false;
                }
            }
            this.players.push(player);
            return true;
        }
    };
    this.onClick = function(player,callback) {
        if (isPlayer(player)) {
            if (pointInBox(player, this.button)) {
                var emptyCell = findEmptyCell(this);
                if (emptyCell) {
                    this.button.x = emptyCell.x;
                    this.button.y = emptyCell.y;
                    callback('button-move', button);
                }
                else {
                    this.button.width *= SHRINK_RATE;
                    this.button.height *= SHRINK_RATE;
                    callback('button-shrink', this.button);
                }
            }
        }
    };
    this.removePlayer = function (id) {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].id == id) {
                this.players = this.players.splice(i,1);
            }
        }
    };
};
function findEmptyCell(scene){
    return false;
}
module.exports.findEmptyCell = findEmptyCell;
function isPlayer(player){
    return player 
            && player instanceof module.exports.Player
            && player.id 
            && player.name 
            && (player.x||player.x===0) 
            && (player.y||player.y===0);
}
module.exports.isPlayer = isPlayer;
function pointInBox(point, box){
    return point.x > box.x && point.x < box.x + box.width && point.y > box.y && point.y < box.y + box.height;
}