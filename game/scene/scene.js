var Button = require('./button.js').button;
module.exports.Scene = function (width, height, button) {
    this.width = width;
    this.height = height;
    this.button = button | new Button();
    this.players = [];
};
module.exports.Player = function player(id, x, y) {
    this.id = id | idgen.generate();
    this.x = x | 0;
    this.y = y | 0;
};