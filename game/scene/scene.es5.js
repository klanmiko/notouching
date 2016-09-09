'use strict';

var idgen = require('shortid');
module.exports.Button = function (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width | 100;
    this.height = height | 100;
};
var players = 1;
module.exports.Scene = function (width, height, button) {
    this.width = width;
    this.height = height;
    this.button = button;
    this.players = [];
    this.getPlayerByID = function (id) {
        for (var i = 0; i < players.length; i++) {
            if (players[i].id == id) {
                return players[i];
            }
        }
    };
    this.addPlayer = function (player) {
        if (isPlayer(player)) {
            for (var i = 0; i < players.length; i++) {
                if (players[i].id == player.id) {
                    return false;
                }
            }
            players.push(player);
            return true;
        }
    };
    this.onClick = function (player, callback) {
        if (isPlayer(player)) {
            if (pointInBox(new Point(player.x, player.y), button)) {
                var emptyCell = findEmptyCell();
                if (emptyCell) {
                    button.x = emptyCell.x;
                    button.y = emptyCell.y;
                    callback('button-move', button);
                } else {
                    callback('button-shrink', button);
                }
            }
        }
    };
    this.removePlayer = function (id) {
        for (var i = 0; i < players.length; i++) {
            if (players[i].id == id) {
                players.splice(i);
            }
        }
    };
};
function findEmptyCell() {
    return false;
}
function isPlayer(player) {
    return player && player.id && player.name && player.x && player.y;
}
module.exports.isPlayer = isPlayer;
function pointInBox(point, box) {
    return point.x > box.x && point.x < box.x + box.width && point.y > box.y && point.y < box.y + box.height;
}
function Point(x, y) {
    this.x = x;
    this.y = y;
}
module.exports.Player = function Player(id, x, y, name) {
    this.id = id | idgen.generate();
    this.name = name | "player" + players;
    this.x = x | 0;
    this.y = y | 0;
    players++;
};

