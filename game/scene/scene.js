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
function edge(axis, origin) {
    this.axis = axis;
    this.origin = origin;
};
module.exports.Edge = edge;
function grid(horizontal, vertical) {
    this.horizontals = horizontal;
    this.verticals = vertical;
    edgeQuickSort(this.horizontals,0,this.horizontals.length-1);
    edgeQuickSort(this.verticals,0,this.horizontals.length-1);
};
module.exports.Grid = grid;
function edgeQuickSort(edges, low, high) {
    if (low < high) {
        var p = edgePartition(edges, low, high);
        edgeQuickSort(edges, low, p);
        edgeQuickSort(edges, p + 1, high);
    }
}
function edgePartition(edges,low,high) {
    var pivot = edges[low].axis;
    var i = low - 1;
    var j = high + 1;
    while (true) {
        do {
            i++;
        } while (edges[i].axis < pivot);
        do {
            j--;
        } while (edges[j].axis > pivot);
        if (i >= j)
            return j;
        var temp = edges[j];
        edges[j] = edges[i];
        edges[i] = temp;
    }
}
function gridify(scene) {
    var points = scene.players;
    var horizontals = [];
    var verticals = [];
    for (var a = 0; a < points.length; a++) {
        horizontals.push(new edge(points[a].y, points[a].x));
        verticals.push(new edge(points[a].x, points[a].y));
    }
    horizontals.push(new edge(0, 0));
    verticals.push(new edge(0, 0));
    horizontals.push(new edge(scene.height, 0));
    verticals.push(new edge(scene.width, 0));
    return new grid(horizontals, verticals);
};
module.exports.gridify = gridify;
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
function findEmptyCell(scene) {
    var grid = gridify(scene);
    for (var i = 0; i < grid.verticals.length; i++) {
        for (var j = i; j < grid.verticals.length; j++) {
            if (grid.verticals[j].axis - grid.verticals[i].axis < scene.button.width) continue;
            for (var x = 0; x < grid.horizontals.length; x++) {
                for (var y = x; y < grid.horizontals.length; y++) {
                    if (grid.horizontals[y].axis - grid.horizontals[x].axis < scene.button.height) continue;
                    var box = new Object();
                    var clear = true;
                    box.x = grid.verticals[i].axis;
                    box.y = grid.horizontals[x].axis;
                    box.width = grid.verticals[j].axis - grid.verticals[i].axis;
                    box.height = grid.horizontals[y].axis - grid.horizontals[x].axis;
                    for (var a = x; a < y - x; a++) {
                        var point = new Object();
                        point.x = grid.horizontals[a].origin;
                        point.y = grid.horizontals[a].axis;
                        if (pointInBox(point, box)){
                            clear = false;
                        }
                    }
                    if (clear) return box;
                }
            }
        }
    }
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