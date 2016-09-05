var Icon = require('./icons/icon.js').Icon;
var idgen = require('shortid');
var players=1;
function model(id, x, y, icon, name) {
    this.id = id | idgen.generate();
    this.x = x;
    this.y = y;
    this.icon = icon | new Icon();
    this.name = name | ("player" + players);
    players++;
}
module.exports = model;