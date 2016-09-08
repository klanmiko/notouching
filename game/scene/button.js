var SHRINK_RATE = 0.8;
module.exports.button = function (x, y, width, height){
    this.x = x | 0;
    this.y = y | 0;
    this.width = width;
    this.height = height;
    this.shrink = function () {
        height *= SHRINK_RATE;
        width *= SHRINK_RATE;
    };
}