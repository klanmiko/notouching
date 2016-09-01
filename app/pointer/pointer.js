var Icon = require('./icons/icon.js').Icon;
var idgen = require('shortid');
function model(id, x, y, icon) {
    this.id = id | idgen.generate();
    this.x = x;
    this.y = y;
    this.icon = icon | new Icon();
}
module.exports = model;