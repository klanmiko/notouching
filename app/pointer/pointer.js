var Icon = require('./icons/icon.js');
function model(id, x, y, width, height, icon) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width|50;
    this.height = height|50;
    this.icon = icon | new Icon();
}
module.exports.Pointer = model;